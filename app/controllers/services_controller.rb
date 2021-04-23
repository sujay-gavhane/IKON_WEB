class ServicesController < ApplicationController

  def new
    respond_to do |format|
      format.json  do 
      	firearm_types = FirearmType.all.order('id desc')
      	service_types = ServiceType.all.order('id asc')
        render json: { firearm_types: firearm_types, service_types: service_types }
      end
      format.html
    end
  end

  def get_quote
  end

  def create
    url = quote_path(quotes_params)
    respond_to do |format|
      format.json do
        render json: { url: url }
      end
    end
  end

  private

  def quotes_params
    params.require(:service).permit(:firearm_type, :service_type, :service_work)
  end
end
