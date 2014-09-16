class AddAddressToImage < ActiveRecord::Migration
  def change
    add_column :images, :address, :string
    add_column :images, :place_name, :string
  end
end
