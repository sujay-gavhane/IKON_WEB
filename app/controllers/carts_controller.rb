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
    
  end
end
