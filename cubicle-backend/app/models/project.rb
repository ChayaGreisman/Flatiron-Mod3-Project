class Project < ApplicationRecord
  has_many :tasks
  has_many :team_members
  has_many :members, through: :team_members
end
