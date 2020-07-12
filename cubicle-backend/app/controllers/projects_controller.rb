class ProjectsController < ApplicationController

  def index
    projects =  Project.all.sort_by{|x|x.id} 
    render json: projects.to_json(:include => {
      :team_members => {:only => [:id,:project_id,:member_id],:include=>[:member]},
      :tasks => {:only => [:id,:name, :priority,:project_id],:include=>[:members]}
    })
  end

  def create
    project = Project.create(project_params)
    render json: project
  end

  def update 
    project =  Project.find_by(id:params[:id])
    project.update(project_params)
    render json: project
  end

  def destroy 
    project =  Project.find(params[:id])
    project.tasks.each do |task|
        task.assigments.each do |assigment|
          assigment.destroy
        end
        task.destroy
    end
    project.team_members.each do |team_member|
      team_member.destroy
    end
    project.destroy
    render json: project
  end 

  private 
  def project_params
    params.require(:project).permit(:name,:deadline)
  end
end
