class Registration < ActiveRecord::Base
  validates_presence_of :name, :last_name, :email, :mode_of_reach, :company_name
end
