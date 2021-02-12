class ProductsController < ApplicationController
  before_action :authenticate_user!

  def index
    products = Product.includes(:category).joins(:collection_type).page(params[:page]).per(4)
    @collections = products.where(collection_types: {name: 'Collection'})
    @parts = products.where(collection_types: {name: 'Parts'})

    respond_to do |format|
      format.json  { render :json => {collections: @collections, parts: @parts } }
      format.html
    end
  end
end