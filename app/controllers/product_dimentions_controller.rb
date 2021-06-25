class ProductDimentionsController < ApplicationController
  before_action :authenticate_user!

  def index
    respond_to do |format|
      format.json  { render json: { dimentions: current_user.product_dimentions.order('id desc') } }
      format.html
    end
  end

  def create
    dimentions_params = pd_params.merge(user_id: current_user.id)
    @dimention = ProductDimention.create(dimentions_params)
    respond_to do |format|
      if @dimention.errors.blank?
        format.json { render json: { msg: 'Product Dimention Added Successfully' }}
      else
        format.json { render json: { msg: '', errors: @dimention.errors.full_messages.join('<br>')}}
      end
      format.html
    end
  end

  def update
    @dimention = ProductDimention.find_by(id: params[:id])
    @dimention.update(pd_params)
    respond_to do |format|
      if @dimention.errors.blank?
        format.json { render json: { msg: 'Product Dimention Updated Successfully' }}
      else
        format.json { render json: { msg: '', errors: @dimention.errors.full_messages.join('<br>')}}
      end
      format.html
    end
  end

  def destroy
    ProductDimention.find_by(id: params[:id]).destroy
    respond_to do |format|
      format.json  { render json: { msg: 'Product Dimention Deleted Successfully' } }
      format.html
    end
  end

  def show
    respond_to do |format|
      format.json  { render json: { dimention: ProductDimention.find(params[:id]) } }
    end
  end

  private
  def pd_params
    params.require(:product_dimention).permit(:user_id, :name, :width, :weight, :height, :length)
  end
end
