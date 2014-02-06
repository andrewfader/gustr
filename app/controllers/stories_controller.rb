class StoriesController < InheritedResources::Base
  def new
    @story = Story.new
  end

  def create
    super { story_wizard_path(@story, page: 1) }
  end

  def update
    if params["story"]["title"].present? && params["story"]["nifty"].present?
      super { story_path(@story) }
    else
      super { story_wizard_path(@story, page: @story.step) }
    end
  end

  def wizard
    @story = Story.find(params[:story_id])
    if @genre = params[:genre]
      @story.update_attributes(genre: @genre)
    end
    @n = @story.step || 0
    unless @story.step == 6
      render "stories/page"
    else
      redirect_to story_path(@story)
    end
  end

  def permitted_params
    params.permit(story: [:title, :genre, :place_name, :city, {time1: []}, {time2: []}, :step, :why, :adventure, :nifty, :wise, {mom: []}])
  end

end
