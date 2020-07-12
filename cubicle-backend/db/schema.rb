# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_06_175117) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "assigments", force: :cascade do |t|
    t.bigint "task_id", null: false
    t.bigint "member_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["member_id"], name: "index_assigments_on_member_id"
    t.index ["task_id"], name: "index_assigments_on_task_id"
  end

  create_table "members", force: :cascade do |t|
    t.string "name"
    t.string "image_url"
    t.string "role"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "projects", force: :cascade do |t|
    t.string "name"
    t.string "deadline"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "tasks", force: :cascade do |t|
    t.string "name"
    t.bigint "project_id", null: false
    t.integer "priority"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["project_id"], name: "index_tasks_on_project_id"
  end

  create_table "team_members", force: :cascade do |t|
    t.bigint "project_id", null: false
    t.bigint "member_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["member_id"], name: "index_team_members_on_member_id"
    t.index ["project_id"], name: "index_team_members_on_project_id"
  end

  add_foreign_key "assigments", "members"
  add_foreign_key "assigments", "tasks"
  add_foreign_key "tasks", "projects"
  add_foreign_key "team_members", "members"
  add_foreign_key "team_members", "projects"
end
