class RegistrationsController < Devise::RegistrationsController
  respond_to :html
  before_filter :tag_path
  def create
    build_resource(sign_up_params)

    if resource.save
      yield resource if block_given?
      if resource.active_for_authentication?
        set_flash_message :notice, :signed_up if is_flashing_format?
        sign_up(resource_name, resource)
        redirect_to resource.tag_path
      else
        set_flash_message :notice, :"signed_up_but_#{resource.inactive_message}" if is_flashing_format?
        expire_data_after_sign_in!
        redirect_to resource.tag_path
      end
    else
      clean_up_passwords resource
      @tracker ||= Mixpanel::Tracker.new('d0f304dcde52b884367ecfafca53ee17')
      tracker.alias(request.ip, resource.id)
      respond_with resource
    end
  end

  private

  def tag_path
    @tag_path = params[:tag_path]
  end

end
