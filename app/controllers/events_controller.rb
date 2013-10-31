class EventsController < InheritedResources::Base
  def create
    super { '/' }
  end
  def index
    @events = Event.all
    respond_to do |format|
      format.json { render json: @events}
    end
  end
  private
  def permitted_params
    params.permit(event: [:name, :business_id, :address, :description])
  end
end
