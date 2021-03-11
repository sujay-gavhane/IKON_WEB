class CreateStatus < ActiveRecord::Migration[6.0]
  def change
    create_table :statuses do |t|
    	t.string :name, null: false
    	t.timestamps
    end

    add_column :orders, :status_id, :integer
  end
end
