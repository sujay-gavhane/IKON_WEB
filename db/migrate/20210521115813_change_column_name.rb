class ChangeColumnName < ActiveRecord::Migration[6.0]
  def change
  	rename_column :firearm_types, :type_name, :name
  	rename_column :service_types, :type_name, :name
  	rename_column :coupons, :code, :name
  end
end
