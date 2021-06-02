class AddShippingToOrders < ActiveRecord::Migration[6.0]
  def change
  	add_column :orders, :shipping, :float, null: false, default: 0.0
  end
end
