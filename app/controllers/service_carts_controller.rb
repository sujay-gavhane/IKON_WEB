class ServiceCartsController < ApplicationController
  # before_action :authenticate_user!, only: [:checkout]
  # before_action :authorize_user

  def update
    begin
      firearm_type_id = FirearmType.find_by(key: params[:service][:firearm_types]['name']).id
      cart_id = session[:service_cart] || current_user.try(:service_cart).id
      if params[:service][:firearm_types][:service_types].keys.length > 1
        params[:service][:firearm_types][:service_types].keys.each do |k|
          service_type_id = ServiceType.find_by(key: k).id
          if params[:service][:firearm_types][:service_types][k].keys.length > 1
            params[:service][:firearm_types][:service_types][k].keys.each do |j|
              service_work = ServiceWork.find_by(key: j, firearm_type_id: firearm_type_id, service_type_id: service_type_id)
              work_items = params[:service][:firearm_types][:service_types][k][j]
              @user_cart = ServiceCartItem.create(
                service_cart_id: cart_id,
                service_work_id: service_work.id,
                service_type_id: service_type_id,
                firearm_type_id: firearm_type_id,
                service_work_name: service_work.key,
                frame_work_style_of_crown: work_items[:swivel_installation_style],
                frame_work_hardware: work_items[:frame_work_hardware],
                barrel_work_style_of_crown: work_items[:style_of_crown],
                barrel_work_lengthof_barrel: work_items[:final_lenght_of_barrel],
                barrel_work_barrel_threads: work_items[:barrel_threads],
                action_work_model_name: work_items[:select_model],
                stock_work_hardware_type: work_items[:recoil_hardware_pistol] || work_items[:recoil_hardware_rifle],
                stock_work_hardware: work_items[:rifle_pad] || work_items[:field_pad] || work_items[:skeet_pad] || work_items[:trap_pad]
              )
            end
          else
            keys = params[:service][:firearm_types][:service_types][k].keys
            service_work = ServiceWork.find_by(key: keys.first, firearm_type_id: firearm_type_id, service_type_id: service_type_id)
            work_items = params[:service][:firearm_types][:service_types][k][keys.first]
            @user_cart = ServiceCartItem.create(
              service_cart_id: cart_id,
              service_work_id: service_work.id,
              service_type_id: service_type_id,
              firearm_type_id: firearm_type_id,
              service_work_name: service_work.key,
              frame_work_style_of_crown: work_items[:swivel_installation_style],
              frame_work_hardware: work_items[:frame_work_hardware],
              barrel_work_style_of_crown: work_items[:style_of_crown],
              barrel_work_lengthof_barrel: work_items[:final_lenght_of_barrel],
              barrel_work_barrel_threads: work_items[:barrel_threads],
              action_work_model_name: work_items[:select_model],
              stock_work_hardware_type: work_items[:recoil_hardware_pistol] || work_items[:recoil_hardware_rifle],
              stock_work_hardware: work_items[:rifle_pad] || work_items[:field_pad] || work_items[:skeet_pad] || work_items[:trap_pad]
            )
          end
        end
      else
        service_type_id = ServiceType.find_by(key: params[:service][:firearm_types][:service_types].keys.first).id
        service_type = params[:service][:firearm_types][:service_types].keys.first
        if params[:service][:firearm_types][:service_types][service_type].keys.length > 1
          params[:service][:firearm_types][:service_types][service_type].keys.each do |k|

            service_work = ServiceWork.find_by(key: k, firearm_type_id: firearm_type_id, service_type_id: service_type_id)
            work_items = params[:service][:firearm_types][:service_types][service_type]
            @user_cart = ServiceCartItem.create(
              service_cart_id: cart_id,
              service_work_id: service_work.id,
              service_type_id: service_type_id,
              firearm_type_id: firearm_type_id,
              service_work_name: service_work.key,
              frame_work_style_of_crown: work_items[:swivel_installation_style],
              frame_work_hardware: work_items[:frame_work_hardware],
              barrel_work_style_of_crown: work_items[:style_of_crown],
              barrel_work_lengthof_barrel: work_items[:final_lenght_of_barrel],
              barrel_work_barrel_threads: work_items[:barrel_threads],
              action_work_model_name: work_items[:select_model],
              stock_work_hardware_type: work_items[:recoil_hardware_pistol] || work_items[:recoil_hardware_rifle],
              stock_work_hardware: work_items[:rifle_pad] || work_items[:field_pad] || work_items[:skeet_pad] || work_items[:trap_pad]
            )
          end
        else
          keys = params[:service][:firearm_types][:service_types][service_type].keys
          service_work = ServiceWork.find_by(key: params[:service][:firearm_types][:service_types][service_type].keys.first, firearm_type_id: firearm_type_id, service_type_id: service_type_id)
          work_items = params[:service][:firearm_types][:service_types][service_type][keys.first]
          @user_cart = ServiceCartItem.create(
            service_cart_id: cart_id,
            service_work_id: service_work.id,
            service_type_id: service_type_id,
            firearm_type_id: firearm_type_id,
            service_work_name: service_work.key,
            frame_work_style_of_crown: work_items[:swivel_installation_style],
            frame_work_hardware: work_items[:frame_work_hardware],
            barrel_work_style_of_crown: work_items[:style_of_crown],
            barrel_work_lengthof_barrel: work_items[:final_lenght_of_barrel],
            barrel_work_barrel_threads: work_items[:barrel_threads],
            action_work_model_name: work_items[:select_model],
            stock_work_hardware_type: work_items[:recoil_hardware_pistol] || work_items[:recoil_hardware_rifle],
            stock_work_hardware: work_items[:rifle_pad] || work_items[:field_pad] || work_items[:skeet_pad] || work_items[:trap_pad]
          )
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
      Cart.find(session[:service_cart]).service_cart_items.update(service_cart_id: current_user.service_cart.id)
    end
    respond_to do |format|
      format.json do
        @service_cart_items = @service_cart.service_cart_items.includes(:service_type, :service_work, :firearm_type).order('id desc')
        @service_cart_items = @service_cart_items.map { |item| item.as_json.merge({
         firearm_type_name: item.firearm_type.type_name,
         service_type_name: item.service_type.type_name,
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
      Coupon.find_by(code: params[:code])
    end 
    if @coupon && @coupon.start_at < Time.now && @coupon.end_at > Time.now
      msg = "Discount $#{@coupon.discount} applied on total amount"
    else
      msg = 'Invalid Coupon'
    end
    respond_to do |format|
      format.json do
        render json: { msg: msg, discount: @coupon.present? ? @coupon.discount : 0, coupon_id: @coupon.id }
      end
    end
  end

  # def checkout
  #   if session[:cart].present? && current_user.try(:cart)
  #     Cart.find(session[:cart]).user_carts.update(cart_id: current_user.cart.id)
  #   else
  #     @cart.update(is_guest: false, user_id: current_user.id)
  #   end
  #   respond_to do |format|
  #     format.html
  #   end
  # end

  private

  def authorize_user
    authorize! :manage_cart, @cart, session[:cart]
  end
end
