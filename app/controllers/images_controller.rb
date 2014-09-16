class ImagesController < InheritedResources::Base
  respond_to :html, :json
  def permitted_params
    params.permit(image: [:upload, :caption, :user_id, :posX, :posY, :width, :height, :question1, :question1a, :question2, :question2a, :question3, :question4])
  end

  def index
    @image = Image.new
    @user_id = current_user.try(&:id) || request.ip.gsub(".","").gsub(":","")
    super
  end

  def new
    @user_id = current_user.try(&:id) || request.ip.gsub(".","").gsub(":","")
    super
  end

  def show
    @image = Image.find(params[:id])
    @editable = (current_user && (@image.user_id == current_user.id)) || (@image.user_id == request.ip.gsub(".","").gsub(":",""))
    super
  end

  def update
    super { images_path }
  end

  def edit
    @image = Image.find(params[:id])
    if @image.parent_id
      redirect_to image_path(@image.parent_id)
    else
      redirect_to images_path
    end
  end

  def recaption
    @image = Image.find(params[:image_id])
    image = Image.new
    image.upload = @image.upload
    image.parent_id = @image.id
    if current_user
      image.user_id = current_user.id
    else
      image.user_id = request.ip.gsub(".","").gsub(":","")
    end

    image.save!
    redirect_to image_path(image)
  end
end
