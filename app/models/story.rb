class Story < ActiveRecord::Base
  GENRES = ["Eating Out","Date Night","Events & Celebrations", "Travel","Health & Wellness","Kid Adventure"]
  has_many :graphics
  has_many :tags
  belongs_to :user
  accepts_nested_attributes_for :graphics
  serialize :tags
  serialize :mom
  serialize :time1
  serialize :time2
  def tagged_by(ip, tag)
    Tag.where(place_id: self.id, user_ip: ip, tag: tag).present?
  end
end
