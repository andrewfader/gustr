class CreatePlaces < ActiveRecord::Migration
  def change
    create_table :places do |t|
      t.string :name
      t.timestamps
    end
    create_table :graphics do |t|
      t.belongs_to :place
      t.string :upload
      t.timestamps
    end
  end
end
