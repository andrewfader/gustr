class Place < ActiveRecord::Base
  include Yelp::V1::Review::Request
  has_many :graphics
  has_many :tags
  accepts_nested_attributes_for :graphics
  serialize :tags

  def tagged_by(ip, tag)
    Tag.where(place_id: self.id, user_ip: ip, tag: tag).present?
  end

  def yelp
    @yelp ||= client = Yelp::Client.new; request = Location.new(term: self.name, address: self.address); client.search request
  end

end
