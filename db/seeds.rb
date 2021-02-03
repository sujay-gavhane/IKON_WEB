# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
@admin = Admin.new(email: 'admin@ikon-web.com', password: 'Admin@123', password_confirmation: 'Admin@123')
@admin.save
@admin.add_role(:super_admin)
Role.create(name: 'admin')
