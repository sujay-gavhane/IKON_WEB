class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

  validates :email, presence: true

  has_many :addresses, dependent: :destroy
  has_many :orders, dependent: :destroy
  has_one :cart, dependent: :destroy
  has_one :service_cart, dependent: :destroy
  has_many :service_requests, dependent: :destroy

  def full_name
    "#{self.try(:first_name)} #{self.try(:last_name)}"
  end
end
