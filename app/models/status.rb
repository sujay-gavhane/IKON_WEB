class Status < ApplicationRecord
  has_many :orders
  
  validates :name, presence: true

  before_save :camelize_name

  def camelize_name
    self.name = self.name.camelize
  end
end
