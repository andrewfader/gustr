class Graphic < ActiveRecord::Base
  mount_uploader :upload, PlaceUploader
  belongs_to :story
end
