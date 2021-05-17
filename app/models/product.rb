class Product < ApplicationRecord
  belongs_to :category
  belongs_to :collection_type

  has_many :user_carts
  has_many :carts, through: :user_carts, dependent: :destroy
  has_and_belongs_to_many :colors
  has_and_belongs_to_many :coupons

  validates :name, presence: true
  validates :price, presence: true
end