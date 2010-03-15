class CreateModeOfReaches < ActiveRecord::Migration
  def self.up
    create_table :mode_of_reaches do |t|
      t.string :name
      t.timestamps
    end
  end

  def self.down
    drop_table :mode_of_reaches
  end
end
