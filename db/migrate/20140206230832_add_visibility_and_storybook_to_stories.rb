class AddVisibilityAndStorybookToStories < ActiveRecord::Migration
  def change
    add_column :stories, :visible, :boolean
  end
end
