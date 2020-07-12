class CreateTeamMembers < ActiveRecord::Migration[6.0]
  def change
    create_table :team_members do |t|
      t.belongs_to :project, null: false, foreign_key: true
      t.belongs_to :member, null: false, foreign_key: true

      t.timestamps
    end
  end
end
