class ServicesController < ApplicationController

  def new
    respond_to do |format|
      format.json  do 
      	firearm_types = FirearmType.all.order('id desc')
      	service_types = ServiceType.all.order('id asc')
        service_cart_id = session[:service_cart] || current_user.service_cart.id
        render json: { firearm_types: firearm_types, service_types: service_types, service_cart_id: service_cart_id }
      end
      format.html
    end
  end

  private

  def quotes_params
    params.require(:service).permit(:firearm_type, :service_type, :service_work)
  end
end
