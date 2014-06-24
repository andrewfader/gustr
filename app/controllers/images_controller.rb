class ImagesController < InheritedResources::Base
  respond_to :html, :json
  def permitted_params
    params.permit(image: [:upload, :caption, :user_id, :posX, :posY])
  end

end
