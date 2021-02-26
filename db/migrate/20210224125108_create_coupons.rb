class CreateCoupons < ActiveRecord::Migration[6.0]
  def change
    create_table :coupons do |t|
    	t.string :code, null: false
    	t.datetime :start_at
    	t.datetime :end_at
    	t.integer :discount

    	t.timestamps
    end

    create_table :coupons_products do |t|
      t.belongs_to :product
      t.belongs_to :coupon
    end
  end
end
