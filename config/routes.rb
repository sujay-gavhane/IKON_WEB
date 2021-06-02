Rails.application.routes.draw do
  devise_for :users
  devise_for :admins, controllers: { sessions: "admins/sessions"}
  mount RailsAdmin::Engine => '/ikon_admin', as: 'rails_admin'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: '/', controller: 'home', action: 'index'
  get '/about_us', to: 'home#about_us'
  get '/privacy_policy', to: 'home#privacy_policy'
  get '/terms_and_conditions', to: 'home#terms_and_conditions'
  get '/faq', to: 'home#faq'
  get '/contact_us', to: 'home#contact_us'

  resources :products
  resources :addresses
  resources :carts, only: [:update, :show, :destroy] do
    member do
      put 'update_quantity'
      put 'apply_coupon'
      get 'checkout'
      get 'get_shipping_cost'
    end
  end
  resources :orders, only: [:create, :show, :index, :destroy] do
    member do
      put 'update_address'
    end
  end
  resources :services
  get '/quote', to: 'service_carts#show'
  resources :service_carts, only: [:update, :show, :destroy] do
    member do
      put 'apply_coupon'
      get 'checkout'
    end
  end
  resources :service_requests, only: [:create, :show, :index, :destroy] do
    member do
      put 'update_address'
    end
  end
end
