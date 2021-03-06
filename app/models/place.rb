class Place < ActiveRecord::Base
  has_many :graphics
  has_many :tags
  accepts_nested_attributes_for :graphics
  serialize :tags
  after_create :get_star_rating

  def tagged_by(ip, tag)
    Tag.where(place_id: self.id, user_ip: ip, tag: tag).present?
  end

  def yelp
    unless @yelp
      # client = Yelp::Client.new
      request = Location.new(term: self.name, address: self.address)
      @yelp = client.search(request)
    end
    @yelp
  end

  private
  def get_star_rating
    if yelp.present? && yelp["businesses"].present?
      self.star_rating = yelp["businesses"].first["rating_img_url"]
      self.save!
    end
  end
end
