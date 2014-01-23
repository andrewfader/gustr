class WelcomeController < ApplicationController
  def map
    @long = request.location.longitude
    @lat = request.location.latitude
  end
  def index

  end
end
