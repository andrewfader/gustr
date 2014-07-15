class ChangeIpColumnType < ActiveRecord::Migration
  def change
    change_column :images, :user_id, :string
  end
end
