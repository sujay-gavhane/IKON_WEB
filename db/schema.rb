# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_05_19_105937) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "addresses", force: :cascade do |t|
    t.string "address_line_one", null: false
    t.string "address_line_two", null: false
    t.string "city", null: false
    t.string "state", null: false
    t.string "country", null: false
    t.integer "pincode"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_addresses_on_user_id"
  end

  create_table "admins", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "first_name"
    t.string "last_name"
    t.string "mobile_number"
    t.index ["email"], name: "index_admins_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true
  end

  create_table "admins_roles", id: false, force: :cascade do |t|
    t.bigint "admin_id"
    t.bigint "role_id"
    t.index ["admin_id", "role_id"], name: "index_admins_roles_on_admin_id_and_role_id"
    t.index ["admin_id"], name: "index_admins_roles_on_admin_id"
    t.index ["role_id"], name: "index_admins_roles_on_role_id"
  end

  create_table "carts", force: :cascade do |t|
    t.boolean "is_guest", default: false
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "carts_products", force: :cascade do |t|
    t.bigint "product_id"
    t.bigint "cart_id"
    t.bigint "color_id"
    t.integer "quantity", default: 0
    t.integer "order_id"
    t.index ["cart_id"], name: "index_carts_products_on_cart_id"
    t.index ["color_id"], name: "index_carts_products_on_color_id"
    t.index ["product_id"], name: "index_carts_products_on_product_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "collection_types", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "colors", force: :cascade do |t|
    t.string "name", null: false
  end

  create_table "colors_products", force: :cascade do |t|
    t.bigint "product_id"
    t.bigint "color_id"
    t.index ["color_id"], name: "index_colors_products_on_color_id"
    t.index ["product_id"], name: "index_colors_products_on_product_id"
  end

  create_table "coupons", force: :cascade do |t|
    t.string "code", null: false
    t.datetime "start_at"
    t.datetime "end_at"
    t.integer "discount"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "coupons_products", force: :cascade do |t|
    t.bigint "product_id"
    t.bigint "coupon_id"
    t.index ["coupon_id"], name: "index_coupons_products_on_coupon_id"
    t.index ["product_id"], name: "index_coupons_products_on_product_id"
  end

  create_table "firearm_types", force: :cascade do |t|
    t.string "type_name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "key"
  end

  create_table "firearm_types_service_types", force: :cascade do |t|
    t.bigint "firearm_type_id"
    t.bigint "service_type_id"
    t.index ["firearm_type_id"], name: "index_firearm_types_service_types_on_firearm_type_id"
    t.index ["service_type_id"], name: "index_firearm_types_service_types_on_service_type_id"
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "address_id", null: false
    t.bigint "coupon_id"
    t.float "total_amount", null: false
    t.float "net_amount", null: false
    t.float "taxes", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "status_id"
    t.index ["address_id"], name: "index_orders_on_address_id"
    t.index ["coupon_id"], name: "index_orders_on_coupon_id"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.float "price"
    t.bigint "category_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "collection_type_id", null: false
    t.index ["category_id"], name: "index_products_on_category_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.string "resource_type"
    t.bigint "resource_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id"
    t.index ["name"], name: "index_roles_on_name"
    t.index ["resource_type", "resource_id"], name: "index_roles_on_resource_type_and_resource_id"
  end

  create_table "service_cart_items", force: :cascade do |t|
    t.string "service_work_name", null: false
    t.bigint "firearm_type_id"
    t.bigint "service_type_id"
    t.bigint "service_work_id"
    t.bigint "service_cart_id"
    t.string "frame_work_style_of_crown"
    t.string "frame_work_hardware"
    t.string "barrel_work_style_of_crown"
    t.string "barrel_work_lengthof_barrel"
    t.string "barrel_work_barrel_threads"
    t.string "action_work_model_name"
    t.string "stock_work_hardware_type"
    t.string "stock_work_hardware"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "service_request_id"
    t.index ["firearm_type_id"], name: "index_service_cart_items_on_firearm_type_id"
    t.index ["service_cart_id"], name: "index_service_cart_items_on_service_cart_id"
    t.index ["service_type_id"], name: "index_service_cart_items_on_service_type_id"
    t.index ["service_work_id"], name: "index_service_cart_items_on_service_work_id"
  end

  create_table "service_carts", force: :cascade do |t|
    t.boolean "is_guest", default: false
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "service_requests", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "address_id", null: false
    t.bigint "coupon_id"
    t.bigint "status_id"
    t.float "total_amount", null: false
    t.float "net_amount", null: false
    t.float "taxes", null: false
    t.integer "total_estimated_time"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["address_id"], name: "index_service_requests_on_address_id"
    t.index ["coupon_id"], name: "index_service_requests_on_coupon_id"
    t.index ["status_id"], name: "index_service_requests_on_status_id"
    t.index ["user_id"], name: "index_service_requests_on_user_id"
  end

  create_table "service_types", force: :cascade do |t|
    t.string "type_name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "key"
  end

  create_table "service_works", force: :cascade do |t|
    t.string "name", null: false
    t.string "work_description"
    t.integer "service_type_id", null: false
    t.integer "firearm_type_id", null: false
    t.string "estimated_cost_labor"
    t.string "estimated_time"
    t.string "estimated_cost_part"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "key"
  end

  create_table "static_pages", force: :cascade do |t|
    t.string "name", null: false
    t.text "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "statuses", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "first_name"
    t.string "last_name"
    t.integer "mobile_number"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "addresses", "users"
  add_foreign_key "products", "categories"
end
