class Address < ApplicationRecord
  belongs_to :user
  validates :address_line_one, presence: true
  validates :address_line_two, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :country, presence: true
  validates :pincode, presence: true
end
