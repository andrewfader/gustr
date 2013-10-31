class Event < ActiveRecord::Base
  belongs_to :business
  def lat
    geocode[0]
  end
  def lng
    geocode[1]
  end
  def geocode
    @geocode ||= Geocoder.coordinates(address)
  end
  def as_json(options=nil)
    super.merge!({lat: lat, lng: lng, biz_name: business.name})
  end
end

