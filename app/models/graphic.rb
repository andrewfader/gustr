class Graphic < ActiveRecord::Base
  mount_uploader :upload, StoryUploader
  belongs_to :story
end
