class OrderMailer < ApplicationMailer

  def order_placed_successfully
    @user = User.find_by(email: params[:user])
    @order = Order.find_by(id: params[:order])
    mail(to: @user.email, subject: 'Order Placed Successfully')
  end

  def order_status_update
    @user = User.find_by(email: params[:user])
    @order = Order.find_by(id: params[:order])
    mail(to: @user.email, subject: 'Order Status Update')
  end

  def order_cancel
    @user = User.find_by(email: params[:user])
    @order = Order.find_by(id: params[:order])
    mail(to: @user.email, subject: 'Order Canceled')
  end
end
