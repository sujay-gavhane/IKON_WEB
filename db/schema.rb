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

ActiveRecord::Schema.define(version: 2021_02_24_125108) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

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

  create_table "static_pages", force: :cascade do |t|
    t.string "name", null: false
    t.text "content"
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

  add_foreign_key "addresses", "users"
  add_foreign_key "products", "categories"
end
