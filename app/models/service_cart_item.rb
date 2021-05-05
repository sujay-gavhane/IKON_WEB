class ServiceCartItem < ApplicationRecord
  belongs_to :service_cart
  belongs_to :firearm_type
  belongs_to :service_type
  belongs_to :service_work
  belongs_to :service_request, optional: true
end
