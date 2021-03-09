class OrdersController < ApplicationController
  before_action :authenticate_user!

  def create
    @order = current_user.orders.build(order_params)
    if @order.save
      if @order.purchase(card_params)
        @cart.user_carts.where('order_id IS NULL').update(order_id: @order.id)
        flash[:notice] = 'Order placed successfully.'
        url = order_path(@order.id)
      else
        flash[:alert] = 'Error while making payment.'
        url = checkout_cart_path(@cart.id)
      end
    else
      flash[:alert] = 'Error while making payment.'
      url = checkout_cart_path(@cart.id)
    end
    respond_to do |format|
      format.json do
        render json: { url: url }
      end
    end
  end

  def show
    @order = Order.find(params[:id])
    respond_to do |format|
      format.json do
        order_items = @order.user_carts.includes(:color, product: [:category]).order('id desc')
        order_items = order_items.map { |item| item.as_json.merge({ 
          product: item.product, color: item.color,
          category_name: item.product.category.name
        })}
        render json: { order_items: order_items, order: @order, address: @order.address }
      end
      format.html
    end
  end

  def update_address
    @address = Address.find(params[:address_id])
    @order = Order.find(params[:id])
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

  private

  def order_params
    params.require(:order).permit(:user_id, :address_id, :coupon_id, :total_amount, :net_amount, :taxes)
  end

  def card_params
    params.permit(:card_number, :first_name, :last_name, :card_month, :card_year, :cvv)
  end
end
