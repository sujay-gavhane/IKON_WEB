class CreateCart < ActiveRecord::Migration[6.0]
  def change
    create_table :carts do |t|
      t.boolean :is_guest, default: false
      t.integer :user_id

      t.timestamps
    end

    create_table :carts_products do |t|
      t.belongs_to :product
      t.belongs_to :cart
      t.belongs_to :color
    end
  end
end
