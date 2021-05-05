class CreateServiceRequest < ActiveRecord::Migration[6.0]
  def change
    create_table :service_requests do |t|
    	t.belongs_to :user, null: false
      t.belongs_to :address, null: false
      t.belongs_to :coupon
      t.belongs_to :status
      t.float :total_amount, null: false
      t.float :net_amount, null: false
      t.float :taxes, null: false
      t.integer :total_estimated_time

      t.timestamps
    end

    add_column :service_cart_items, :service_request_id, :integer
  end
end
