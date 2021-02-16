class Product < ApplicationRecord
  belongs_to :category
  belongs_to :collection_type
  has_and_belongs_to_many :colors
  
  has_many :user_carts
  has_many :cart, through: :user_carts

  validates :name, presence: true
  validates :price, presence: true
end