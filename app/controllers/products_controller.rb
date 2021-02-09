class ProductsController < ApplicationController
  before_action :authenticate_user!

  def index
    products = Product.includes(:category).joins(:collection_type).all
    @collections = products.where(collection_types: {name: 'Collection'})
    @parts = products.where(collection_types: {name: 'Parts'})
  end
end