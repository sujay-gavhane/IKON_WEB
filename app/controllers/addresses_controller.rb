class AddressesController < ApplicationController
  before_action :authenticate_user!

  def index
    respond_to do |format|
      format.json  { render json: { addresses: current_user.addresses.order('id desc') } }
      format.html
    end
  end

  def create
    address_params = addr_params.merge(user_id: current_user.id)
    @address = Address.create(address_params)
    respond_to do |format|
      if @address.errors.blank?
        format.json { render json: { msg: 'Address Added Successfully' }}
      else
        format.json { render json: { msg: '', errors: @address.errors.full_messages.join('<br>')}}
      end
      format.html
    end
  end

  def update
    @address = Address.find_by(id: params[:id])
    @address.update(addr_params)
    respond_to do |format|
      if @address.errors.blank?
        format.json { render json: { msg: 'Address Updated Successfully' }}
      else
        format.json { render json: { msg: '', errors: @address.errors.full_messages.join('<br>')}}
      end
      format.html
    end
  end

  def destroy
    @address = Address.find_by(id: params[:id]).destroy
    respond_to do |format|
      format.json  { render json: { msg: 'Address Deleted Successfully' } }
      format.html
    end
  end

  def show
    respond_to do |format|
      format.json  { render json: { address: Address.find(params[:id]) } }
    end
  end

  private
  def addr_params
    params.require(:address).permit(:user_id, :city, :state, :pincode, :country, :address_line_one, :address_line_two)
  end
end
