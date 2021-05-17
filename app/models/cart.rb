class Cart < ApplicationRecord
  belongs_to :user, optional: true

  has_many :user_carts
  has_many :products, through: :user_carts, dependent: :destroy
end
