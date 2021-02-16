class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :current_cart

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(:first_name, :last_name, :mobile_number, :email, :password, :password_confirmation, :current_password)}
  end

  def current_cart
    if current_user
      @cart = current_user.cart
    else
      if session[:cart]
        @cart = Cart.find_by(id: session[:cart])
      else
        @cart = Cart.create(is_guest: true)
        session[:cart] = @cart.id
      end
    end
  end
end
