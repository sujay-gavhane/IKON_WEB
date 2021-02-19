class AddressesController < ApplicationController
  before_action :authenticate_user!

  def index
    respond_to do |format|
      format.json  { render json: { addresses: current_user.addresses } }
      format.html
    end
  end

  def create
    address_params = addr_params.merge(user_id: current_user.id)
    @address = Address.create(address_params)
    respond_to do |format|
      format.json  { render json: { msg: 'Address Added Successfully' } }
      format.html
    end
  end

  private
  def addr_params
    params.require(:address).permit(:user_id, :city, :state, :pincode, :country, :address_line_one, :address_line_two)
  end
end
