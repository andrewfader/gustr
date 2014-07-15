class AddAddlFieldsToImages < ActiveRecord::Migration
  def change
    add_column :images, :question1, :boolean
    add_column :images, :question1a, :text
    add_column :images, :question2, :string
    add_column :images, :question2a, :string
    add_column :images, :question3, :string
    add_column :images, :question4, :text
  end
end
