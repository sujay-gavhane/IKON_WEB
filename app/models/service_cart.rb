class ServiceCart < ApplicationRecord
  belongs_to :user, optional: true
  has_many :service_cart_items, dependent: :destroy
end
