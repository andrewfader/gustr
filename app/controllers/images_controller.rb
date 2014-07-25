class ImagesController < InheritedResources::Base
  respond_to :html, :json
  def permitted_params
    params.permit(image: [:upload, :caption, :user_id, :posX, :posY, :width, :height, :question1, :question1a, :question2, :question2a, :question3, :question4])
  end

  def index
    @image = Image.new
    @user_id = current_user.try(&:id) || request.ip.gsub(".","")
    super
  end

  def new
    @user_id = current_user.try(&:id) || request.ip.gsub(".","")
    super
  end

  def show
    @image = Image.find(params[:id])
    @editable = (current_user && (@image.user_id == current_user.id)) || (@image.user_id == request.ip.gsub(".",""))
    super
  end

  def update
    super { images_path }
  end

end
