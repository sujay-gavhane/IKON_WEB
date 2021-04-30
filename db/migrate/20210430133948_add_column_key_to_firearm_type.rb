class AddColumnKeyToFirearmType < ActiveRecord::Migration[6.0]
  def change
    add_column :firearm_types, :key, :string 
    add_column :service_types, :key, :string 
    add_column :service_works, :key, :string 
  end
end
