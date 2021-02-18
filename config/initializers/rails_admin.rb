RailsAdmin.config do |config|

  ### Popular gems integration

  ## == Devise ==
  config.authenticate_with do
    warden.authenticate! scope: :admin
  end
  config.current_user_method(&:current_admin)

  ## == CancanCan ==
  config.authorize_with :cancancan

  ## == Pundit ==
  # config.authorize_with :pundit

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  ## == Gravatar integration ==
  ## To disable Gravatar integration in Navigation Bar set to false
  # config.show_gravatar = true

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end
  config.excluded_models = [Cart, UserCart]

  config.model 'Role' do 
    edit do
      field :name
    end
    export do; end
    create do; end
    update do; end
  end

  config.model 'User' do 
    edit do
      field :email
      field :password
      field :password_confirmation
      field :first_name
      field :last_name
      field :mobile_number
    end
    export do; end
    create do; end
    update do; end
  end

  config.model 'Category' do 
    edit do
      field :name
      field :description
    end
    export do; end
    create do; end
    update do; end
  end

  config.model 'CollectionType' do 
    edit do
      field :name
    end
    export do; end
    create do; end
    update do; end
  end

  config.model 'Address' do 
    edit do
      field :address_line_one
      field :address_line_two
      field :city
      field :state
      field :country
      field :pincode
      field :user_id, :enum do
        enum do
          User.all.collect {|u| [u.full_name, u.id]}
        end
      end
    end
    export do; end
    create do; end
    update do; end
  end

end
