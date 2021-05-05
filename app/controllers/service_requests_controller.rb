class ServiceRequestsController < ApplicationController
	before_action :authenticate_user!
  before_action :get_service_request, only: [:show, :update_address, :destroy]

  def create
    @service_request = current_user.service_requests.build(order_params)
    if @service_request.save
      if @service_request.purchase(card_params)
        @service_cart.service_cart_items.where('service_request_id IS NULL').update(service_request_id: @service_request.id)
        # OrderMailer.with(user: current_user.email, order: @order.id).order_placed_successfully.deliver_now
        flash[:notice] = 'Service Request placed successfully.'
        url = service_request_path(@service_request.id)
      else
        @service_request.destroy
        flash[:alert] = 'Error while making payment.'
        url = checkout_service_cart_path(@service_cart.id)
      end
    else
      puts "/////////////// #{@service_request.errors.full_messages}"
      flash[:alert] = 'Error while placing Service Request.'
      url = checkout_service_cart_path(@service_cart.id)
    end
    respond_to do |format|
      format.json do
        render json: { url: url }
      end
    end
  end

  def show
    respond_to do |format|
      format.json do
        service_request_items = @service_request.service_cart_items.order('id desc')
        @service_request_items = service_request_items.map { |item| item.as_json.merge({
        	firearm_type_name: item.firearm_type.type_name,
         	service_type_name: item.service_type.type_name,
         	service_work: item.service_work }) }
        render json: { status: @service_request.status.try(:name),
         service_request_items: @service_request_items,
         service_request: @service_request,
         address: @service_request.address,
         discount: @service_request.coupon.try(:discount) }
      end
      format.html
    end
  end

  def update_address
    @address = Address.find(params[:address_id])
    if @address
      @service_request.update(address_id: @address.id)
      msg = 'Address Updated'
    else
      msg = 'Error while Updating Address'
    end
    respond_to do |format|
      format.json do
        render json: { msg: msg, address: @address }
      end
    end
  end

  def index
    respond_to do |format|
      format.json do
        orders = current_user.orders.includes(user_carts: [:color, product: [:category]]).order('id desc').page(params[:page]).per(4)
        orders = orders.map{ |order| order.as_json.merge({
          status: order.status.try(:name),
          user_carts: order.user_carts.map { |item| item.as_json.merge({ product: item.product }) }
        })}
        render json: { orders: orders }
      end
      format.html
    end
  end

  def destroy
    respond_to do |format|
      format.json do
        if @order.update(status_id: Status.find_by(name: 'Canceled').id)
          OrderMailer.with(user: current_user.email, order: @order.id).order_cancel.deliver_now
          msg = 'Order Canceled sunccessfully'
        else
          msg = 'Error while canceling Order'
        end
        render json: { msg: msg }
      end
    end
  end

  private

  def order_params
    params.require(:service_request).permit(:user_id, :address_id, :coupon_id, :total_amount, :net_amount, :taxes, :total_estimated_time)
  end

  def card_params
    params.permit(:card_number, :first_name, :last_name, :card_month, :card_year, :cvv)
  end

  def get_service_request
    @service_request = ServiceRequest.find(params[:id])
  end
end
