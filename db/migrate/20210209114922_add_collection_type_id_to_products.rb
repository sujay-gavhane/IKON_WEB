class AddCollectionTypeIdToProducts < ActiveRecord::Migration[6.0]
  def change
    add_column :products, :collection_type_id, :integer, null: false
  end
end
