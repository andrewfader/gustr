class EventsController < InheritedResources::Base
  def create
    super { '/' }
  end
  private
  def permitted_params
    params.permit(event: [:name, :business_id, :address, :description])
  end
end
