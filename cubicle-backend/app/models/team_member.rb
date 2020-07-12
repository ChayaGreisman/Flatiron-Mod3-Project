class TeamMember < ApplicationRecord
  belongs_to :project
  belongs_to :member
end
