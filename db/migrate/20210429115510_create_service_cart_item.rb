class CreateServiceCartItem < ActiveRecord::Migration[6.0]
  def change
    create_table :service_cart_items do |t|
    	t.string :service_work_name, null: false
      t.belongs_to :firearm_type
      t.belongs_to :service_type
      t.belongs_to :service_work
      t.belongs_to :service_cart
    	t.string :frame_work_style_of_crown
    	t.string :frame_work_hardware
    	t.string :barrel_work_style_of_crown
    	t.string :barrel_work_lengthof_barrel
    	t.string :barrel_work_barrel_threads
    	t.string :action_work_model_name
    	t.string :stock_work_hardware_type
    	t.string :stock_work_hardware

    	t.timestamps
    end
  end
end
