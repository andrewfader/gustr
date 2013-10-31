class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name
      t.integer :business_id
      t.string :address
      t.string :description
    end
  end
end
