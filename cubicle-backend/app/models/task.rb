class Task < ApplicationRecord
  belongs_to :project
  has_many :assigments
  has_many :members, through: :assigments
  accepts_nested_attributes_for :members

  def member_attributes=(member_attributes)
    member_attributes.each do |member_attribute|
      member = Member.find_by(member_attribute)
      self.members << member
    end
  end
end
