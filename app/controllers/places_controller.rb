class PlacesController < InheritedResources::Base
  def show
    if params[:name]
      @place = Place.find_or_create_by(name: params[:name])
    else
      super
    end
  end
end
