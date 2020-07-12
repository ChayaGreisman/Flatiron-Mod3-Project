class CreateAssigments < ActiveRecord::Migration[6.0]
  def change
    create_table :assigments do |t|
      t.belongs_to :task, null: false, foreign_key: true
      t.belongs_to :member, null: false, foreign_key: true

      t.timestamps
    end
  end
end
