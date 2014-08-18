class Image < ActiveRecord::Base
  mount_uploader :upload, ImageUploader
  belongs_to :user
  has_many :recaptions, class_name: Image, foreign_key: :parent_id
  belongs_to :parent, class_name: Image
end
