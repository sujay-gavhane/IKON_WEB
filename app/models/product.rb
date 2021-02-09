class Product < ApplicationRecord
  belongs_to :category
  belongs_to :collection_type

  validates :name, presence: true
  validates :price, presence: true
end