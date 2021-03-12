class OrdersController < ApplicationController
  before_action :authenticate_user!
  before_action :get_order, only: [:show, :update_address, :destroy]

  def create
    @order = current_user.orders.build(order_params)
    if @order.save
      if @order.purchase(card_params)
        @cart.user_carts.where('order_id IS NULL').update(order_id: @order.id)
        OrderMailer.with(user: current_user.email, order: @order.id).order_placed_successfully.deliver_now
        flash[:notice] = 'Order placed successfully.'
        url = order_path(@order.id)
      else
        @order.destroy
        flash[:alert] = 'Error while making payment.'
        url = checkout_cart_path(@cart.id)
      end
    else
      flash[:alert] = 'Error while placing order.'
      url = checkout_cart_path(@cart.id)
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
        order_items = @order.user_carts.includes(:color, product: [:category]).order('id desc')
        order_items = order_items.map { |item| item.as_json.merge({ 
          product: item.product, color: item.color,
          category_name: item.product.category.name
        })}
        render json: { status: @order.status.try(:name), order_items: order_items, order: @order, address: @order.address, discount: @order.coupon.try(:discount) }
      end
      format.html
    end
  end

  def update_address
    @address = Address.find(params[:address_id])
    if @address
      @order.update(address_id: @address.id)
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
        orders = current_user.orders.includes(user_carts: [:color, product: [:category]])
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
    params.require(:order).permit(:user_id, :address_id, :coupon_id, :total_amount, :net_amount, :taxes)
  end

  def card_params
    params.permit(:card_number, :first_name, :last_name, :card_month, :card_year, :cvv)
  end

  def get_order
    @order = Order.find(params[:id])
  end
end
