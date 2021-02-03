Rails.application.routes.draw do
  devise_for :users
  devise_for :admins, controllers: { sessions: "admins/sessions"}
  mount RailsAdmin::Engine => '/ikon_admin', as: 'rails_admin'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: '/', controller: 'home', action: 'index'
end
