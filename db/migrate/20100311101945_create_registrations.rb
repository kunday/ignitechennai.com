class CreateRegistrations < ActiveRecord::Migration
  def self.up
    create_table :registrations do |t|
      t.string :name
      t.string :last_name
      t.string :email
      t.text :one_line_abstract
      t.integer :phone_no
      t.string :mode_of_reach

      t.timestamps
    end
  end

  def self.down
    drop_table :registrations
  end
end
