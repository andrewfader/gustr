class AddTagsToPlaces < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.belongs_to :place
      t.string :user_ip
      t.string :tag
      t.timestamps
    end
  end
end
