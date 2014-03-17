class AddExpensiveToStories < ActiveRecord::Migration
  def change
    add_column :stories, :expensive, :string
  end
end
