class ProductsController < ApplicationController
  before_action :get_product, only: [:show]
  add_breadcrumb "Home", :root_path
  add_breadcrumb "Our Collection", :products_path

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
    add_breadcrumb "Product", product_path(@product)
    respond_to do |format|
      format.json  { render json: { product: @product.as_json.merge({colors: @product.colors.pluck(:name)}) } }
      format.html
    end
  end

  def format_json(collection)
    collection.map { |product| product.as_json.merge({category_name: product.category.name}) }
  end

  def get_product
    @product = Product.find_by(id: params[:id])
  end
end