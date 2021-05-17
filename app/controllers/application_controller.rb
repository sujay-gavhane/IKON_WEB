class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :current_cart
  before_action :current_service_cart
  
  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(:first_name, :last_name, :mobile_number, :email, :password, :password_confirmation, :current_password)}
  end

  def current_cart
    return if request.host == ENV['HOST_IP']
    if current_user && session[:cart].present?
      @cart = current_user.cart ? current_user.cart : Cart.find_by(id: session[:cart])
    else
      if session[:cart] && params[:controller] == 'carts' && ['update', 'destroy'].exclude?(params[:action])
        @cart = Cart.find_by(id: params[:id])
      elsif session[:cart]
        @cart = Cart.find_by(id: session[:cart])
      else
        @cart = Cart.create(is_guest: true)
        session[:cart] = @cart.id
      end
    end
  end

  def current_service_cart
    return if request.host == ENV['HOST_IP']
    if current_user && session[:service_cart].present?
      @service_cart = current_user.service_cart ? current_user.service_cart : ServiceCart.find_by(id: session[:service_cart])
    else
      if session[:service_cart] && params[:controller] == 'service_carts' && ['update', 'destroy'].exclude?(params[:action])
        @service_cart = ServiceCart.find_by(id: params[:id])
      elsif session[:service_cart]
        @service_cart = ServiceCart.find_by(id: session[:service_cart])
      else
        @service_cart = ServiceCart.create(is_guest: true)
        session[:service_cart] = @service_cart.id
      end
    end
  end
end
