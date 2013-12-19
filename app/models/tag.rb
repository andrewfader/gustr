class Tag < ActiveRecord::Base
  belongs_to :place
  TAGS = ["Organic","Grass Fed", "Locally Sourced","Vegetarian"]
  TAGS.each do |tag|
    scope tag.underscore.to_sym, -> {where(tag: tag.underscore)}
  end
end
