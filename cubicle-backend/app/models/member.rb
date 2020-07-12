class Member < ApplicationRecord
  has_many :assigments
  has_many :tasks, through: :assigments
  has_many :team_members
  has_many :projects, through: :team_members
end


