class ServiceWork < ApplicationRecord
	belongs_to :service_type
	belongs_to :firearm_type
end
