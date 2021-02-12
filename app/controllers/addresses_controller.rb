class AddressesController < ApplicationController
  before_action :authenticate_user!

  def index
    @addresses = current_user.addresses
  end
end
