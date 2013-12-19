class PlacesController < InheritedResources::Base
  layout false
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
    tag = Tag.where(user_ip: request.ip, tag: params[:tag], place_id: @place.id)
    if tag.present?
      tag.first.destroy!
    else
      tag = Tag.create!(user_ip: request.ip, tag: params[:tag], place_id: @place.id)
    end
    render @place, layout: false
  end
end
