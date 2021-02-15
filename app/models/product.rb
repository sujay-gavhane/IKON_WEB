class Product < ApplicationRecord
  belongs_to :category
  belongs_to :collection_type
  has_and_belongs_to_many :colors

  validates :name, presence: true
  validates :price, presence: true
end