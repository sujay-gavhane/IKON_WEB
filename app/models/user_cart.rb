class UserCart < ApplicationRecord
  self.table_name = 'carts_products'

  belongs_to :cart
  belongs_to :product
  belongs_to :color
  belongs_to :order, optional: true
end
