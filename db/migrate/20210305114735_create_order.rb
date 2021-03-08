class CreateOrder < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.belongs_to :user, null: false
      t.belongs_to :address, null: false
      t.belongs_to :coupon
      t.float :total_amount, null: false
      t.float :net_amount, null: false
      t.float :taxes, null: false

      t.timestamps
    end

    add_column :carts_products, :order_id, :integer 
  end
end
