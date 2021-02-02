Rails.application.routes.draw do
  devise_for :admins
  mount RailsAdmin::Engine => '/ikon_admin', as: 'rails_admin'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # root to: '/ikon_admin'
end
