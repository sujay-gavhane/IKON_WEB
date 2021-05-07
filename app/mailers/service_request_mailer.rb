class ServiceRequestMailer < ApplicationMailer
	def service_request_placed_successfully
    @user = User.find_by(email: params[:user])
    @service_request = ServiceRequest.find_by(id: params[:service_request])
    mail(to: @user.email, subject: 'Service Request Placed Successfully')
  end

  def service_request_status_update
    @user = User.find_by(email: params[:user])
    @service_request = ServiceRequest.find_by(id: params[:service_request])
    mail(to: @user.email, subject: 'Service Request Status Update')
  end

  def service_request_cancel
    @user = User.find_by(email: params[:user])
    @service_request = ServiceRequest.find_by(id: params[:service_request])
    mail(to: @user.email, subject: 'Service Request Canceled')
  end
end
