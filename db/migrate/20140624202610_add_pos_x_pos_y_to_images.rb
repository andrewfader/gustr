class AddPosXPosYToImages < ActiveRecord::Migration
  def change
    add_column :images, :posX, :integer
    add_column :images, :posY, :integer
  end
end
