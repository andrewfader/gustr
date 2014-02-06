# encoding: utf-8
require 'carrierwave/orm/activerecord'
class StoryUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  if Rails.env.development?
    storage :file
  else
    storage :fog
  end

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
  version :thumb do
    process :resize_to_fill => [200, 200]
  end
  def extension_white_list
    %w(jpg jpeg gif png)
  end
end
