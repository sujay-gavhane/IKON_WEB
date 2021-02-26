class CartsController < ApplicationController
  def update
    begin
      @product = Product.find_by(id: params[:id])
      @color = Color.find_by(name: params[:color])
      @user_cart = UserCart.find_by(color: @color, product: @product, cart: @cart)
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
    respond_to do |format|
      format.json do
        @users_cart_products = @cart.user_carts.includes(:color, product: [:category]).order('id desc')
        @users_cart_products = @users_cart_products.map { |item| item.as_json.merge({ product: item.product, color: item.color, category_name: item.product.category.name }) }
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
    @user_cart = UserCart.find_by(color: @color, product: @product, cart: @cart)
    if @user_cart && @user_cart.quantity == 1 && params[:quantity].to_i == -1
      @user_cart.destroy
    else
      @user_cart.update(quantity: @user_cart.quantity + params[:quantity].to_i)
    end
  end

  def apply_coupon
    @coupon = Coupon.find_by(code: params[:code])
    if @coupon.start_at < Time.now && @coupon.end_at > Time.now
      msg = "Discount $#{@coupon.discount} applied on total amount"
    else
      msg = 'Invalid Coupon'
    end
    respond_to do |format|
      format.json do
        render json: { msg: msg, discount: @coupon.discount }
      end
    end
  end
end
