require 'net/http'
require 'uri'
class ServiceCartsController < ApplicationController
  before_action :authenticate_user!, only: [:checkout]
  before_action :authorize_user

  def update
    begin
      firearm_type_id = FirearmType.find_by(key: params[:service][:firearm_types]['name']).try(:id)
      cart_id = session[:service_cart] || current_user.try(:service_cart).id
      if params[:service][:firearm_types][:service_types].keys.length > 1
        params[:service][:firearm_types][:service_types].keys.each do |k|
          service_type_id = ServiceType.find_by(key: k).try(:id)
          if params[:service][:firearm_types][:service_types][k].keys.length > 1
            params[:service][:firearm_types][:service_types][k].keys.each do |j|
              service_work = ServiceWork.find_by(key: j, firearm_type_id: firearm_type_id, service_type_id: service_type_id)
              work_items = params[:service][:firearm_types][:service_types][k][j]
              ServiceCartItem.create_cart_item(cart_id, service_work, service_type_id, firearm_type_id, work_items)
            end
          else
            keys = params[:service][:firearm_types][:service_types][k].keys
            service_work = ServiceWork.find_by(key: keys.first, firearm_type_id: firearm_type_id, service_type_id: service_type_id)
            work_items = params[:service][:firearm_types][:service_types][k][keys.first]
            ServiceCartItem.create_cart_item(cart_id, service_work, service_type_id, firearm_type_id, work_items)
          end
        end
      else
        service_type_id = ServiceType.find_by(key: params[:service][:firearm_types][:service_types].keys.first).try(:id)
        service_type = params[:service][:firearm_types][:service_types].keys.first
        if params[:service][:firearm_types][:service_types][service_type].keys.length > 1
          params[:service][:firearm_types][:service_types][service_type].keys.each do |k|

            service_work = ServiceWork.find_by(key: k, firearm_type_id: firearm_type_id, service_type_id: service_type_id)
            work_items = params[:service][:firearm_types][:service_types][service_type]
            ServiceCartItem.create_cart_item(cart_id, service_work, service_type_id, firearm_type_id, work_items)
          end
        else
          keys = params[:service][:firearm_types][:service_types][service_type].keys
          service_work = ServiceWork.find_by(key: params[:service][:firearm_types][:service_types][service_type].keys.first, firearm_type_id: firearm_type_id, service_type_id: service_type_id)
          work_items = params[:service][:firearm_types][:service_types][service_type][keys.first]
          ServiceCartItem.create_cart_item(cart_id, service_work, service_type_id, firearm_type_id, work_items)
        end
      end
      url = quote_path(id: cart_id)
      message = 'Quote Created Successfully'
    rescue  => error
      puts error.inspect
      url = new_service_path
      message = 'Error while getting Quote'
    end
    respond_to do |format|
      format.json { render json: { msg: message, url: url } }
    end
  end

  def show
    if session[:service_cart].present? && current_user.try(:service_cart)
      ServiceCart.find(session[:service_cart]).service_cart_items.update(service_cart_id: current_user.service_cart.id)
    end
    respond_to do |format|
      format.json do
        @service_cart_items = @service_cart.service_cart_items.includes(:service_type, :service_work, :firearm_type).where('service_request_id IS NULL').order('id desc')
        @service_cart_items = @service_cart_items.map { |item| item.as_json.merge({
         firearm_type_name: item.firearm_type.name,
         service_type_name: item.service_type.name,
         service_work: item.service_work }) }
        render json: { service_cart_items: @service_cart_items }
      end
      format.html
    end
  end

  def destroy
    respond_to do |format|
      format.json do
        @service_cart.service_cart_items.where(id: params[:id]).first.destroy
        render json: { msg: 'Product removed from cart.' }
      end
    end
  end

  def apply_coupon
    @coupon = if params[:code].present?
      Coupon.find_by(name: params[:code])
    end 
    if @coupon && @coupon.start_at < Time.now && @coupon.end_at > Time.now
      msg = "Discount $#{@coupon.discount} applied on total amount"
    else
      msg = 'Invalid Coupon'
    end
    respond_to do |format|
      format.json do
        render json: { msg: msg, discount: @coupon.present? ? @coupon.discount : 0, coupon_id: @coupon ? @coupon.id : 0}
      end
    end
  end

  def checkout
    if session[:service_cart].present? && current_user.try(:service_cart)
      ServiceCart.find(session[:service_cart]).service_cart_items.update(service_cart_id: current_user.service_cart.id)
    else
      @service_cart.update(is_guest: false, user_id: current_user.id)
    end
    respond_to do |format|
      format.html
    end
  end

  def get_shipping_cost
    if params[:zip].present? && params[:country].present? && params[:dimention_id].present? 
      dimention = ProductDimention.find_by(id: params[:dimention_id])
      service_cart_items = @service_cart.service_cart_items.where('service_request_id IS NULL')
      pieces = [{weight: dimention.weight.to_s, length: dimention.length.to_s, width: dimention.width.to_s, height: dimention.height.to_s, insuranceAmount: nil, declaredValue: nil}]
      req_json = {
        carrierCode: "ups",
        serviceCode: "ups_ground",
        packageTypeCode: "ups_custom_package",
        sender: {
          zip: "27306",
          country: "US"
        },
        receiver: {
          zip: params[:zip],
          country: params[:country]
        },
        signatureOptionCode: nil,
        residential: true,
        weightUnit: "lb",
        dimUnit: "in",
        currency: "USD",
        customsCurrency: "USD",
        pieces: pieces
      }.to_json
      uri = URI("https://xpsshipper.com/restapi/v1/customers/#{ENV['XPS_CUSTOMER_ID']}/quote")
      res = Net::HTTP.post(uri, req_json,
       "Content-Type" => "application/json", Authorization: "RSIS #{ENV['XPS_AUTHORIZATION_KEY']}")
      respond_to do |format|
        format.json do
          render json: { shipping_cost: JSON.parse(res.body)['totalAmount'].to_i * 2 }
        end
      end
    else
      respond_to do |format|
        format.json do
          render json: { shipping_cost: 0, error: 'Please Select all mandatory fields' }
        end
      end
    end
  end

  private

  def authorize_user
    authorize! :manage_service_cart, @service_cart, session[:service_cart]
  end
end
