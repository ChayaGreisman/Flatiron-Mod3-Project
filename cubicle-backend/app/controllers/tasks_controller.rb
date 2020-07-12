class TasksController < ApplicationController

  def create 
    task = Task.create(task_params)
    members = Member.find(params[:memberIds])
    task.members << members
    render json: task, include: [:members]
  end

  def update
    task = Task.find_by(id:params[:id])
    task.assigments.each{|assignment| assignment.destroy}
    members = Member.find(params[:memberIds])
    task.members << members
    task.update(task_params)
    render json: task, include: [:members]
  end

  def destroy
    task = Task.find_by(id:params[:id])
    task.assigments.each{|assignment|assignment.destroy}
    task.destroy
    render json: task
  end

  private
  def task_params
    params.require(:task).permit(:name,:priority,:project_id)
  end

  
end
