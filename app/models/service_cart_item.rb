class ServiceCartItem < ApplicationRecord
  belongs_to :service_cart
  belongs_to :firearm_type
  belongs_to :service_type
  belongs_to :service_work
  belongs_to :service_request, optional: true

  def self.create_cart_item(cart_id, service_work, service_type_id, firearm_type_id, work_items)
  	create(
      service_cart_id: cart_id,
      service_work_id: service_work.try(:id),
      service_type_id: service_type_id,
      firearm_type_id: firearm_type_id,
      service_work_name: service_work.key,
      frame_work_style_of_crown: work_items[:swivel_installation_style],
      frame_work_hardware: work_items[:frame_work_hardware],
      barrel_work_style_of_crown: work_items[:style_of_crown],
      barrel_work_lengthof_barrel: work_items[:final_lenght_of_barrel],
      barrel_work_barrel_threads: work_items[:barrel_threads],
      action_work_model_name: work_items[:select_model],
      stock_work_hardware_type: work_items[:recoil_hardware_pistol] || work_items[:recoil_hardware_rifle],
      stock_work_hardware: work_items[:rifle_pad] || work_items[:field_pad] || work_items[:skeet_pad] || work_items[:trap_pad]
    )
  end
end
