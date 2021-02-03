class AddDetailsToAdmins < ActiveRecord::Migration[6.0]
  def change
  	add_column :admins, :first_name, :string
  	add_column :admins, :last_name, :string
  	add_column :admins, :mobile_no, :string
  end
end
