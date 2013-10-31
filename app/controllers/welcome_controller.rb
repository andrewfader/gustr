class WelcomeController < ApplicationController
  def index
    @long = request.location.longitude
    @lat = request.location.latitude
  end
end
