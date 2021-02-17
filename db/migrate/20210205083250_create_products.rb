class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
    	t.string :name, null: false
    	t.text :description
    	t.float :price
    	t.references :category, foreign_key: true

    	t.timestamps
    end
  end
end
