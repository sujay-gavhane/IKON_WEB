class Coupon < ApplicationRecord
  has_and_belongs_to_many :products
  has_many :orders
  validates :name, presence: true
  validates :discount, presence: true
end