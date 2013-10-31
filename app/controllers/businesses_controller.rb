class BusinessesController < InheritedResources::Base
  def create
    super { '/' }
  end
  private
  def permitted_params
    params.permit(business: [:name])
  end
end
