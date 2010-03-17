class ChangePhoneNoToString < ActiveRecord::Migration
  def self.up
    remove_column :registrations, :phone_no
    add_column :registrations, :phone_no, :string
  end

  def self.down
    remove_column :registrations, :phone_no
    add_column :registrations, :phone_no, :integer
  end
end
