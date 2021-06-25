class AddProductDimentionToServiceRequest < ActiveRecord::Migration[6.0]
  def change
  	add_column :service_requests, :product_dimention_id, :integer
  end
end
