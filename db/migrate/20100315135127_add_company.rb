class AddCompany < ActiveRecord::Migration
  def self.up
    add_column :registrations, :company_name, :string
  end

  def self.down
    remove_column :registrations, :company_name
  end
end
