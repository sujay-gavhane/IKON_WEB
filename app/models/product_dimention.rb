class ProductDimention < ApplicationRecord
  belongs_to :user
  has_many :service_request
  
  validates :name, presence: true
  validates :width, presence: true
  validates :length, presence: true
  validates :weight, presence: true
  validates :height, presence: true
end
