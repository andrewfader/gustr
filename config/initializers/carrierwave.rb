require 'carrierwave/orm/activerecord'
CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider               => 'AWS',
    :aws_access_key_id      => 'AKIAIE5N4T5344BWDO2Q',
    :aws_secret_access_key  => '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',
  }
  config.fog_directory  = 'gustr'
end
