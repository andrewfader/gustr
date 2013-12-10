class Place < ActiveRecord::Base
  has_many :graphics
  accepts_nested_attributes_for :graphics
end
