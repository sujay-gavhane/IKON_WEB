class CreateProductDimentions < ActiveRecord::Migration[6.0]
  def change
    create_table :product_dimentions do |t|
    	t.string :name, null: false
    	t.decimal :width, null: false, default: 0.0, precision: 10, scale: 2
    	t.decimal :height, null: false, default: 0.0, precision: 10, scale: 2
    	t.decimal :length, null: false, default: 0.0, precision: 10, scale: 2
    	t.decimal :weight, null: false, default: 0.0, precision: 10, scale: 2
      t.references :user, foreign_key: true
      
      t.timestamps
    end
  end
end
