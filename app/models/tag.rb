class Tag < ActiveRecord::Base
  belongs_to :story
  belongs_to :user
  TAGS = ["Metro Close", "Bike Racks", "Easy Parking", "Valet", "Rentals", "Taxis", "Organic", "Locally Sourced", "Soy Free", "Dairy Free", "Nut Free", "Vegan", "Vegetarian", "Wild Caught", "Gluten Free", "Recycling", "Energy Efficient", "Non-toxic", "Clean", "Kosher", "Halal", "Fair Trade", "Forest Friendly", "Animal Friendly", "Endangered Species Friendly", "Stroller Friendly", "Female Owned", "Mom&Pop Owned", "Flower Guy", "Band", "Nifty Places Close", "Happy Staff", "Open Air Seating", "Special Offers", "Teen friendly", "Child friendly", "Infant friendly"]
  TAGS.each do |tag|
    scope tag.underscore.to_sym, -> {where(tag: tag.underscore)}
  end
end
