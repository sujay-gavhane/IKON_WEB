class CreateServiceType < ActiveRecord::Migration[6.0]
  def change
    create_table :service_types do |t|
    	t.string :type_name, null: false

    	t.timestamps
    end

    create_table :firearm_types_service_types do |t|
      t.belongs_to :firearm_type
      t.belongs_to :service_type
    end
  end
end
