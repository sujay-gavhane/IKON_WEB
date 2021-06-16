class ChangeAmountColumn < ActiveRecord::Migration[6.0]
  def change
  	change_column :orders, :total_amount, :decimal, null: false, default: 0.0, precision: 20, scale: 2
		change_column :orders, :net_amount, :decimal, null: false, default: 0.0, precision: 20, scale: 2
		change_column :orders, :taxes, :decimal, null: false, default: 0.0, precision: 20, scale: 2
		change_column :service_requests, :total_amount, :decimal, null: false, default: 0.0, precision: 20, scale: 2
		change_column :service_requests, :net_amount, :decimal, null: false, default: 0.0, precision: 20, scale: 2
		change_column :service_requests, :taxes, :decimal, null: false, default: 0.0, precision: 20, scale: 2
  	add_column :service_requests, :shipping, :decimal, null: false, default: 0.0, precision: 20, scale: 2
  end
end
