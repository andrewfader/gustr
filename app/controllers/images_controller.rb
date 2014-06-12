class ImagesController < InheritedResources::Base
  def permitted_params
    params.permit(image: [:upload, :caption, :user_id])
  end

end
