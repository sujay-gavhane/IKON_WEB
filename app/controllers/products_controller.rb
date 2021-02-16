class ProductsController < ApplicationController
  before_action :get_product, only: [:show]

  def index
    products = Product.includes(:category).joins(:collection_type).page(params[:page]).per(4)
    @collections = products.where(collection_types: {name: 'Collection'})
    @parts = products.where(collection_types: {name: 'Parts'})

    respond_to do |format|
      format.json  { render :json => {collections: format_json(@collections), parts: format_json(@parts) } }
      format.html
    end
  end

  def show
    respond_to do |format|
      format.json  { render json: { product: @product.as_json.merge({colors: @product.colors.pluck(:name)}) } }
      format.html
    end
  end

  def add_to_cart
    begin
      @product = Product.find_by(id: params[:product][:id].to_i)
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

  def format_json(collection)
    collection.map { |product| product.as_json.merge({category_name: product.category.name}) }
  end

  def get_product
    @product = Product.find_by(id: params[:id])
  end
end