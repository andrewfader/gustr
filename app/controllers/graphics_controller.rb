class GraphicsController < InheritedResources::Base
  def create
    super { "/stories/#{@graphic.story.id}" }
  end
  private
  def permitted_params
    params.permit({graphic: [:upload, :story_id]}, :story_id)
  end
end
