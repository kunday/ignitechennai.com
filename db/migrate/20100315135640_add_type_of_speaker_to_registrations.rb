class AddTypeOfSpeakerToRegistrations < ActiveRecord::Migration
  def self.up
    add_column :registrations, :type_of_attendee, :string
  end

  def self.down
    remove_column :registrations, :type_of_attendee
  end
end
