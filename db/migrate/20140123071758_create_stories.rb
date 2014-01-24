class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.string :title
      t.string :genre
      t.string :storybook
      t.string :tags
      t.string :place_name
      t.string :city
      t.string :time1
      t.string :time2
      t.text :why
      t.text :adventure
      t.text :nifty
      t.text :wise
      t.string :mom
      t.integer :step

      t.timestamps
    end
  end
end
