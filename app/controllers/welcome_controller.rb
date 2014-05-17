class WelcomeController < ApplicationController
  def map
    @long = request.location.longitude
    @lat = request.location.latitude
  end
  def index

  end
  def welcome1; end;
  def welcome2; end
  def privacy; end
  def tos; end
  def about; end
end
