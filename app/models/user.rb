class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

  validates :email, presence: true

  has_many :addresses
  has_many :orders
  has_one :cart

  def full_name
    "#{self.first_name} #{self.last_name}"
  end
end
