class AddQuantityToUserCarts < ActiveRecord::Migration[6.0]
  def change
    add_column :carts_products, :quantity, :integer, default: 0 
  end
end
