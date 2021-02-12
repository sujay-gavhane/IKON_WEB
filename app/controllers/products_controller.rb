class ProductsController < ApplicationController
  before_action :authenticate_user!
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
  end

  def format_json(collection)
    collection.map { |product| product.as_json.merge({category_name: product.category.name}) }
  end

  def get_product
    @product = Product.find_by(id: params[:id])
  end
end