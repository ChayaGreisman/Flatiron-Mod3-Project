# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Assigment.delete_all 
Task.delete_all 
TeamMember.delete_all
Project.delete_all 
Member.delete_all

Project.create(name:"Cubicle",deadline:"2021-01-06")
Project.create(name:"Project Ava",deadline:"2021-06-23")

Member.create(name:"Chaya Greisman",image_url:"https://ca.slack-edge.com/T02MD9XTF-U013D0MNMEV-5c8e0c26c74b-512",role:"Queen, Always Right")
Member.create(name:"Gary Cordero",image_url:"https://ca.slack-edge.com/T02MD9XTF-U0130BRMJD8-cb4df1a405fd-512",role:"TBD")
Member.create(name:"Yoan Ante",image_url:"https://ca.slack-edge.com/T02MD9XTF-UCPMFFXEC-4f02d5eb78ac-512",role:"Space Boy")
Member.create(name:"Sean Padden",image_url:"https://ca.slack-edge.com/T02MD9XTF-UJW55RH1R-4a6e86f2bdb2-512",role:"Table Building Master")
Member.create(name:"Steven Doran",image_url:"https://ca.slack-edge.com/T02MD9XTF-ULYFYNXUN-920567a4beb2-192",role:"Patient Canadian")


25.times do |index|
  Member.create(name:Faker::Name.unique.name,image_url:"https://i.pravatar.cc/150?img=#{index+1}",role:Faker::Job.unique.title)
end

