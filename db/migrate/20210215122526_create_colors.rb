class CreateColors < ActiveRecord::Migration[6.0]
  def change
    create_table :colors do |t|
    	t.string :name, null: false
    end

    create_table :colors_products do |t|
    	t.belongs_to :product
      t.belongs_to :color
    end
  end
end
