class AddTagPathTouser < ActiveRecord::Migration
  def change
    add_column :users, :tag_path, :string
  end
end
