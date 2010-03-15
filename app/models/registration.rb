class Registration < ActiveRecord::Base
  validates_presence_of :name, :last_name, :email, :one_line_abstract, :phone_no, :mode_of_reach, :company_name
  validates_numericality_of :phone_no
end
