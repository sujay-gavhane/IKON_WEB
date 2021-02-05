class HomeController < ApplicationController
  def index
  end

  def about_us
    @about_us = StaticPage.find_by(name: 'About Us')
    @about_us = get_content(@about_us)
  end

  def privacy_policy
    @privacy_policy = StaticPage.find_by(name: 'Privacy Policy')
    @privacy_policy = get_content(@privacy_policy)
  end

  def terms_and_conditions
    @terms_and_conditions = StaticPage.find_by(name: 'Terms and Conditions')
    @terms_and_conditions = get_content(@terms_and_conditions)
  end

  def faq
    @faq = StaticPage.find_by(name: 'faq')
    @faq = get_content(@faq)
  end

  def contact_us
  end

  private

  def get_content(page)
    page.content.html_safe if page.present?
  end
end
