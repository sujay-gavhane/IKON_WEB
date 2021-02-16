class Cart < ApplicationRecord
  belongs_to :user, optional: true
  has_and_belongs_to_many :products

  has_many :user_carts
  has_many :products, through: :user_carts
end
