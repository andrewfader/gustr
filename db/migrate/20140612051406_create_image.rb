class CreateImage < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :upload
      t.string :caption
      t.belongs_to :user
      t.timestamps
    end
  end
end
