class PlacesController < InheritedResources::Base
  def show
    if params[:name]
      @place = Place.find_or_create_by(name: params[:name])
    else
      super
    end
    @place.tags ||= {}
  end
  def tag
    @place = Place.find(params[:place_id])
    tag = Tag.find_or_create_by(user_ip: request.ip)
    tag.update_attributes!(tag: params[:tag], place_id: @place.id)
    redirect_to @place
  end
end
