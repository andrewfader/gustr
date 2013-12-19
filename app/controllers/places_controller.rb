class PlacesController < InheritedResources::Base
  before_action :login, :only => [:tag]
  def show
    @ip = request.ip
    if params[:name]
      @place = Place.find_or_create_by(name: params[:name], address: params[:address])
    else
      super
    end
    @place.tags ||= {}
  end

  def tag
    @ip = request.ip
    @place = Place.find(params[:place_id])
    tag = Tag.where(user_ip: @ip, tag: params[:tag], place_id: @place.id)
    if tag.present?
      tag.first.destroy!
    else
      tag = Tag.create!(user_ip: @ip, tag: params[:tag], place_id: @place.id)
    end
    render :show
  end

  private
  def login
    unless current_user
      redirect_to new_user_registration_path(tag_path: request.original_url)
    end
  end
end
