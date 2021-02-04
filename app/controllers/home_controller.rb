class HomeController < ApplicationController
  def index
  end

  def about_us
    @about_us = StaticPage.find_by(name: 'About Us').content.html_safe
  end

  def privacy_policy
    @privacy_policy = StaticPage.find_by(name: 'Privacy Policy').content.html_safe
  end

  def terms_and_conditions
    @terms_and_conditions = StaticPage.find_by(name: 'Terms and Conditions').content.html_safe
  end

  def faq
    @faq = StaticPage.find_by(name: 'faq').content.html_safe
  end

  def contact_us
  end
end
