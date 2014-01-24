class StoriesController < InheritedResources::Base
  def new
    @genre = params[:genre]
    @story = Story.new
  end
  def create
    super { story_wizard_path(@story, page: 1) }
  end
  def update
    super { story_wizard_path(@story, page: @story.step) }
  end
  def wizard
    @story = Story.find(params[:story_id])
    render "stories/page#{params[:page]}"
  end

  def permitted_params
    params.permit(story: [:title, :genre, :place_name, :city, :time1, :time2, :step, :why, :adventure, :nifty, :wise, :mom])
  end

end
