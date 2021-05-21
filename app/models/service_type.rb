class ServiceType < ApplicationRecord
  has_and_belongs_to_many :firearm_types
  has_many :service_works
  validates :name, presence: true
  validates :key, presence: true
end
