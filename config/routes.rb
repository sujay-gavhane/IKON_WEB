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

  post '/add_to_cart', to: 'products#add_to_cart'

end
