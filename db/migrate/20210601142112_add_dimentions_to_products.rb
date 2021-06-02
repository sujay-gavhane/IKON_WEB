class AddDimentionsToProducts < ActiveRecord::Migration[6.0]
  def change
  	add_column :products, :weight, :float, null: false, default: 0
  	add_column :products, :height, :float, null: false, default: 0
  	add_column :products, :length, :float, null: false, default: 0
  	add_column :products, :width, :float, null: false, default: 0
  end
end
