class Tag < ActiveRecord::Base
  belongs_to :place
  scope :local, -> {where(tag: 'local')}
  scope :organic, -> {where(tag: 'organic')}
  scope :grassfed, -> {where(tag: 'grassfed')}
  scope :homemade, -> {where(tag: 'homemade')}
end
