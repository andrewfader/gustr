class AddStarRatingToBusiness < ActiveRecord::Migration
  def change
    add_column :places, :star_rating, :string
  end
end
