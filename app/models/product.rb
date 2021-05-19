class Product < ApplicationRecord
  belongs_to :category
  belongs_to :collection_type

  has_many :user_carts
  has_many :carts, through: :user_carts, dependent: :destroy
  has_and_belongs_to_many :colors
  has_and_belongs_to_many :coupons
  has_many_attached :images do |attachable|
    attachable.variant :thumb, resize: "100x100"
  end
  attr_accessor :remove_images
	after_save do
    Array(remove_images).each { |id| images.find_by_id(id).try(:purge) }
  end

  validates :name, presence: true
  validates :price, presence: true
end
