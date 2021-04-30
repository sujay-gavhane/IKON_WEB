class CreateServiceCart < ActiveRecord::Migration[6.0]
  def change
    create_table :service_carts do |t|
      t.boolean :is_guest, default: false
      t.integer :user_id

      t.timestamps
    end
  end
end
