class CreateAddresses < ActiveRecord::Migration[6.0]
  def change
    create_table :addresses do |t|
      t.string :address_line_one, null: false
      t.string :address_line_two, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :country, null: false
      t.integer :pincode
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
