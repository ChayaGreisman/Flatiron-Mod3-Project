class TeamMembersController < ApplicationController

  def create
    team_member =  TeamMember.find_or_create_by(team_member_params)
    render json: team_member, include: [:project, :member]
  end

  def destroy 
    team_member =  TeamMember.find(params[:id])
    team_member.member.assigments.each{|assigment| assigment.destroy}
    team_member.destroy
    render json: team_member, include: [:project, :member]
  end

  private 
  def team_member_params
    params.require(:team_member).permit(:project_id,:member_id)
  end

end
