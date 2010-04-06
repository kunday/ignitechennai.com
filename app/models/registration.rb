class Registration < ActiveRecord::Base
  validates_presence_of :name, :last_name, :email, :mode_of_reach, :company_name, :type_of_attendee, :phone_no
end
