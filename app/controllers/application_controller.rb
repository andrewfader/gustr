class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :configure_permitted_parameters, if: :devise_controller?
  protected

  def configure_permitted_parameters
    [:sign_up, :account_update].each do |action|
      [:first_name, :last_name, :city, :zip, :birthdate, :tag_path].each do |new_field|
        devise_parameter_sanitizer.for(action) << new_field
      end
    end
  end

  def tracker
    @tracker ||= Mixpanel::Tracker.new('d0f304dcde52b884367ecfafca53ee17')
  end

  def user_id
    if current_user
      current_user.id
    else
      request.ip
    end
  end
end
