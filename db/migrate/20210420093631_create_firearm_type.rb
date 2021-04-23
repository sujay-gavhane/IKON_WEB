class CreateFirearmType < ActiveRecord::Migration[6.0]
  def change
    create_table :firearm_types do |t|
    	t.string :type_name, null: false

    	t.timestamps
    end
  end
end
