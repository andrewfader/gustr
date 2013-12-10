class Place < ActiveRecord::Base
  has_many :graphics
  has_many :tags
  accepts_nested_attributes_for :graphics
  serialize :tags
end
