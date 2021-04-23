class CreateServiceWork < ActiveRecord::Migration[6.0]
  def change
    create_table :service_works do |t|
    	t.string :name, null: false
    	t.string :work_description
    	t.integer :service_type_id, null: false
    	t.integer :firearm_type_id, null: false
    	t.string :estimated_cost_labor
    	t.string :estimated_time
    	t.string :estimated_cost_part

    	t.timestamps
    end
  end
end
