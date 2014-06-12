class Image < ActiveRecord::Base
  mount_uploader :upload, ImageUploader
  belongs_to :user
end
