class GraphicsController < InheritedResources::Base
  def create
    super { "/places/#{@graphic.place.id}" }
  end
  private
  def permitted_params
    params.permit(graphic: [:upload, :place_id])
  end
end
