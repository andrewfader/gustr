# encoding: utf-8
require 'carrierwave/orm/activerecord'
class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
  version :small do
    process :resize_to_fill => [350, 350]
  end
  version :thumb do
    process :resize_to_fill => [150, 150]
  end
  def extension_white_list
    %w(jpg jpeg gif png)
  end
end
