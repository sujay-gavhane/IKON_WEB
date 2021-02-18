class CartsController < ApplicationController
  def update
    begin
      @product = Product.find_by(id: params[:id])
      @color = Color.find_by(name: params[:color])
      UserCart.create color: @color, product: @product, cart: @cart
      message = 'Added to Cart Successfully'
    rescue
      message = 'Error while adding to cart'
    end
    respond_to do |format|
      format.json { render json: { msg: message } }
    end
  end

  def show
    respond_to do |format|
      format.json do
        @users_cart_products = @cart.user_carts.includes(:product, :color)
        @users_cart_products = @users_cart_products.map { |item| item.as_json.merge({ product: item.product, color: item.color }) }
        render json: { cart_items: @users_cart_products }
      end
      format.html
    end
  end
end
