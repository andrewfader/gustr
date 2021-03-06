class StoriesController < InheritedResources::Base
  respond_to :json
  before_filter :authenticate_user!, only: [:wizard, :tag, :publish, :storybooks]
  def new
    @story = Story.new
  end

  def create
    super { story_wizard_path(@story, page: 0) }
  end

  def update
    if params["story"].has_key?("city") && params["story"].has_key?("nifty")
      super { story_path(@story) }
    else
      super { story_wizard_path(@story, page: @story.step) }
    end
  end

  def publish
    story = Story.find(params[:story_id])
    story.update_attributes!(visible: true)
    tracker.track(user_id, "Publish story")
    redirect_to storybooks_path
  end

  def wizard
    @story = Story.find(params[:story_id])
    if params[:newtitle].present?
      @story.update_attributes!(storybook: params[:newtitle])
      @story.update_attributes!(step: 1)
    end
    @n = (params[:page].presence || @story.step || 0).to_i
    tracker.track(user_id, "Step #{@n}")
    unless @story.step == 6
      render "stories/page"
    else
      redirect_to story_path(@story)
    end
  end

  def tag
    @story = Story.find(params[:story_id])
    if current_user.id == @story.user_id
      @ip = request.ip
      @story = Story.find(params[:story_id])
      tag = Tag.where(user_ip: @ip, tag: params[:tag], story_id: params[:story_id])
      if tag.present?
        tag.first.destroy!
        tracker.track(user_id, "Untag")
      else
        tag = Tag.create!(user_ip: @ip, tag: params[:tag], story_id: params[:story_id])
        tracker.track(user_id, "Tag")
      end
    end
    render :show
  end

  def tags
    @stories = Tag.send(params[:tags]).map(&:story).select{|story| story.visible == true }.select{|story|story.storybook != nil}.uniq
  end

  def search
    tracker.track(user_id, "Search")
  end

  def storybooks
    @stories = Story.where(user_id: current_user.id)
    @story_hash = {}
    @stories.each do |story|
      @story_hash[story.storybook] ||= []
      @story_hash[story.storybook] << story
    end
  end

  def genres
  end

  def genre
    @genre = params[:genre]
    @stories = Story.published.where(genre: @genre)
  end

  def permitted_params
    params.permit(story: [:user_id, :storybook, :title, :genre, :expensive, :place_name, :city, {time1: []}, {time2: []}, :step, :why, :adventure, :nifty, :wise, {mom: []}])
  end

end
