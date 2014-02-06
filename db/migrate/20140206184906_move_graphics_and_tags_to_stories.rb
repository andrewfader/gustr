class MoveGraphicsAndTagsToStories < ActiveRecord::Migration
  def change
    rename_column :tags, :place_id, :story_id
    rename_column :graphics, :place_id, :story_id
  end
end
