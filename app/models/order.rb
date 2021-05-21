class Order < ApplicationRecord
  belongs_to :user
  belongs_to :address
  belongs_to :coupon, optional: true
  belongs_to :status, optional: true

  has_many :user_carts

  validates :user, presence: true
  validates :address, presence: true
  validates :total_amount, presence: true
  validates :net_amount, presence: true
  validates :taxes, presence: true

  before_update :send_status_email

  def purchase(card_params)
    response = GATEWAY.purchase(price_in_cents, credit_card(card_params))
    puts "////////////////////// responseeeeee====== #{response.message}"
    response.success?
  end

  def price_in_cents
    (net_amount*100).round
  end

  def send_status_email
    if self.changes.include?(:status_id) && self.valid?
      unless self.user.email == 'ikon.web.test.email@gmail.com'
        OrderMailer.with(user: self.user.email, order: self.id).order_status_update.deliver_now
      end
    end
  end

  private

  def validate_card
    unless credit_card.valid?
      credit_card.errors.full_messages.each do |message|
        errors.add_to_base message
      end
    end
  end

  def purchase_options
    {
      :ip => ip_address,
      :billing_address => {
        :name     => "Ryan Bates",
        :address1 => "123 Main St.",
        :city     => "New York",
        :state    => "NY",
        :country  => "US",
        :zip      => "10001"
      }
    }
  end

  def credit_card(card_params)
    @credit_card ||= ActiveMerchant::Billing::CreditCard.new(
      :number             => card_params['card_number'].gsub(' ',''),
      :verification_value => card_params['cvv'],
      :month              => card_params['card_month'],
      :year               => card_params['card_year'],
      :first_name         => card_params[:first_name],
      :last_name          => card_params[:last_name]
    )
  end
end
