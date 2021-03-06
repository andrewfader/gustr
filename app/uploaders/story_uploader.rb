# encoding: utf-8
require 'carrierwave/orm/activerecord'
class StoryUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
  version :thumb do
    process :resize_to_fill => [140, 140]
  end
  def extension_white_list
    %w(jpg jpeg gif png)
  end
end
