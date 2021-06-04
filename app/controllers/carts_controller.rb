require 'net/http'
require 'uri'
class CartsController < ApplicationController
  before_action :authenticate_user!, only: [:checkout]
  before_action :authorize_user

  def update
    begin
      @product = Product.find_by(id: params[:id])
      @color = Color.find_by(name: params[:color])
      @user_cart = UserCart.find_by(color: @color, product: @product, cart: @cart, order_id: nil)
      if @user_cart
        @user_cart.update(quantity: @user_cart.quantity + 1)
      else
        UserCart.create color: @color, product: @product, cart: @cart, quantity: 1
      end  
      message = 'Added to Cart Successfully'
    rescue  => error
      puts error.inspect
      message = 'Error while adding to cart'
    end
    respond_to do |format|
      format.json { render json: { msg: message } }
    end
  end

  def show
    if session[:cart].present? && current_user.try(:cart)
      Cart.find(session[:cart]).user_carts.update(cart_id: current_user.cart.id)
    end
    respond_to do |format|
      format.json do
        @users_cart_products = @cart.user_carts.includes(:color, product: [:category]).where('order_id IS NULL').order('id desc')
        @users_cart_products = @users_cart_products.map { |item| item.as_json.merge({ 
         product: item.product, color: item.color, images: item.product.images.map{|i| url_for(i)}, 
         category_name: item.product.category.name }) }
        render json: { cart_items: @users_cart_products }
      end
      format.html
    end
  end

  def destroy
    respond_to do |format|
      format.json do
        @cart.user_carts.where(id: params[:id]).first.destroy
        render json: { msg: 'Product removed from cart.' }
      end
    end
  end

  def update_quantity
    @product = Product.find_by(id: params[:product_id])
    @color = Color.find_by(id: params[:color_id])
    @user_cart = UserCart.find_by(color: @color, product: @product, cart: @cart, order_id: nil)
    if @user_cart && @user_cart.quantity == 1 && params[:quantity].to_i == -1
      @user_cart.destroy
    else
      @user_cart.update(quantity: @user_cart.quantity + params[:quantity].to_i)
    end
  end

  def apply_coupon
    @coupon = if params[:code].present?
      Coupon.find_by(name: params[:code])
    end 
    if @coupon && @coupon.start_at < Time.now && @coupon.end_at > Time.now
      msg = "Discount $#{@coupon.discount} applied on total amount"
    else
      msg = 'Invalid Coupon'
    end
    respond_to do |format|
      format.json do
        render json: { msg: msg, discount: @coupon.present? ? @coupon.discount : 0, coupon_id: @coupon ? @coupon.id : 0}
      end
    end
  end

  def checkout
    if session[:cart].present? && current_user.try(:cart)
      Cart.find(session[:cart]).user_carts.update(cart_id: current_user.cart.id)
    else
      @cart.update(is_guest: false, user_id: current_user.id)
    end
    respond_to do |format|
      format.html
    end
  end

  def get_shipping_cost
    users_cart_products = @cart.user_carts.includes(:color, product: [:category]).where('order_id IS NULL')
    pieces = users_cart_products.map{|c| {weight: c.product.weight.to_s, length: c.product.length.to_s, width: c.product.width.to_s, height: c.product.height.to_s, insuranceAmount: nil, declaredValue: nil}}
    req_json = {
      carrierCode: "ups",
      serviceCode: "ups_ground",
      packageTypeCode: "ups_custom_package",
      sender: {
        zip: "27306",
        country: "US"
      },
      receiver: {
        zip: params[:zip],
        country: params[:country]
      },
      signatureOptionCode: nil,
      residential: true,
      weightUnit: "lb",
      dimUnit: "in",
      currency: "USD",
      customsCurrency: "USD",
      pieces: pieces
    }.to_json
    uri = URI("https://xpsshipper.com/restapi/v1/customers/#{ENV['XPS_CUSTOMER_ID']}/quote")
    res = Net::HTTP.post(uri, req_json,
     "Content-Type" => "application/json", Authorization: "RSIS #{ENV['XPS_AUTHORIZATION_KEY']}")
    byebug
    respond_to do |format|
      format.json do
        render json: { shipping_cost: JSON.parse(res.body)['totalAmount'] }
      end
    end
  end

  private

  def authorize_user
    authorize! :manage_cart, @cart, session[:cart]
  end
end
