class Color < ApplicationRecord
  has_and_belongs_to_many :products
  has_many :user_carts

  validates :name, presence: true
end
