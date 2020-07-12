const BASE_URL = "http://localhost:3000/"
    const PROJECTS_URL = `${BASE_URL}/projects`
    const MEMBERS_URL = `${BASE_URL}/members`
    const TASKS_URL = `${BASE_URL}/tasks`
    const TEAM_MEMBERS_URL = `${BASE_URL}/team_members`
    const MESSAGE = "Please Fill All Fields"

    document.addEventListener("DOMContentLoaded",()=>{
      loadDashboard();
      addSubmitEvents();
      addClickEvents();
    })

    function initializeTooltip(){
      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
    }

    function loadDashboard(){
      fetch(PROJECTS_URL)
      .then(resp=>resp.json())
      .then(projects=>{
        renderProjectDivs(projects) 
        loadMemberOptions();
        initializeTooltip()
        })
      .catch(err => console.log(err))
    }

    function loadMemberOptions(){
      fetch(MEMBERS_URL)
      .then(resp=>resp.json())
      .then(members=>renderMemberOptions(members))
      .catch(err => console.log(err))
    }

    function renderMemberOptions(members){
      const selectCollection = document.querySelectorAll(".member-dropdown")
      selectCollection.forEach(select =>{
        renderMemberOption(members,select)
      })
    }

    function renderMemberOption(members,selectHTMLElement){
      members.forEach(member=>{
        const option = `<option value="${member.id}">${member.name} - ${member.role}</option>`
        selectHTMLElement.insertAdjacentHTML('beforeend',option)
      })
    }

    function renderProjectDivs(projects){
      projects.forEach(project =>{
        renderProjectDiv(project)
      })
    }

    function renderProjectDiv(project){
        let divContainer = document.querySelector(".project-container")
        const div = ` <div class="project-card" data-entire-project-id=${project.id}>
                      <div class="project-title">
                        <ul class="project-card-list" data-project-id=${project.id}>
                          <li style="margin-left:-1em;margin-right:1em;" data-toggle="tooltip" data-placement="top" title="Project Completed?" class="delete-project" >
                            <svg style="border-radius:50%;" width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-check-circle-fill btn-aqua delete-project" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path class="delete-project" fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </svg>
                          </li>
                          <li class="col-4"><strong class="project-name">${project.name}</strong></li>
                          <li><button class="btn btn-lightaqua btn-edit-project" 
                          data-project-id="${project.id}"
                          data-project-name = "${project.name}"
                          data-project-deadline = "${project.deadline}"
                          data-toggle="modal"
                          data-target ="#edit-project-form-modal"
                          >✎</button></li>
                          <li style="margin-left:2em;"> Due Date: <span class="project-deadline">${project.deadline}<span></li>
                          <li style="float: right;">
                          <a class="btn" data-project-id=${project.id}  data-toggle="collapse" href="#collapsediv${project.id}" role="button" aria-expanded="false" aria-controls="collapsediv">
                          ⌄
                          </a>
                          </li>
                        </ul>
                      </div>
                      <div id="collapsediv${project.id}" class="collapse">
                        <hr>
                        <div class="project-body">
                          <h4 class="divider">Project Team Members:</h4>
                            <form class="form-inline add-team-member-form" data-project-id="${project.id}">
                              <div class="form-group mb-2">
                                <select class="form-control member-dropdown" name="member_id" data-project-id="${project.id}">
                                  
                                </select>
                              </div>
                              <div class="form-group mx-sm-3 mb-2">
                              
                              </div>
                              <button type="submit" class="btn btn-aqua mb-2">Add to Team</button>
                            </form>
                            <div class="member-cards-container" data-project-id-team-members="${project.id}">
                              ${renderExistingTeamMembers(project.team_members,project.id)}
                            </div>
                            <hr/>
                            <div class="task-wrapper">
                              <h4 class="divider">Project Tasks:</h4>
                                <button class="btn btn-aqua mb-2 btn-task-modal" data-project-id='${project.id}'>Add a Task <span class="make-it-bigger">+</span></button>
                                <div class="task-card-container" id="taskContainer${project.id}">
                                  <!-- Task Card -->
                                  ${renderExistingTasks(project.tasks)}
                                </div>
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>`;
        divContainer.insertAdjacentHTML("afterbegin",div)
      }
    

    function renderExistingTasks(tasks){
      let taskCards ="";
      if(!!tasks){
        tasks.forEach(task=>{
          const taskCard = createTaskCard(task)
          taskCards += taskCard

        })
      }
      return taskCards
     
    }

    function renderTaskMembers(members){
      let taskMembers = ""
      if(!!members){
        members.forEach(member=>{
          const taskMember = `<div data-task-member-id="${member.id}" class="task-member-img" style="border-radius: 50%;" data-toggle="tooltip" data-placement="top" title="${member.name} - ${member.role}">
                                <img src="${member.image_url}" alt="${member.name}">
                              </div>`
          taskMembers+= taskMember
        })
      }
      return taskMembers
    }

    function createTaskCard(task){
      const taskCard =  `<div class="task-card shadow" data-task-id="${task.id}">
                              <div class="task-desc">
                                <ul class="task-card-list">
                                  <li><strong>${task.name}</strong></li>
                                  <li style="margin-left:2em;">Priority: <span>${task.priority}</span></li>
                                </ul>
                              </div>
                              <div class="task-options">
                                  <span class="make-it-bigger btn-edit-task" data-task-id="${task.id}" data-task-project-id="${task.project_id}">⚙</span>
                              </div>
                              <div class="task-assign-members">
                                ${renderTaskMembers(task.members)}
                              </div>
                          </div>`
      return taskCard
    }

    function renderExistingTeamMembers(teamMembers,projectId){
      let memberCards="";
      if(!!teamMembers){ 
        teamMembers.forEach(teamMember=>{
          const memberCard = `<div class="member-card" id="team-member-${teamMember.member.id}-${projectId}" data-member-id="${teamMember.member.id}">
                              <div class="member-img">
                                  <img src="${teamMember.member.image_url}" alt="${teamMember.member.name}">
                              </div>
                              <div class="delete-team-member">
                                <span class="trash-can" data-team-member-id="${teamMember.id}"> 🗑</span>
                              </div>
                              <div class="member-desc">
                                <p><strong>${teamMember.member.name}</strong><br/>${teamMember.member.role}</p>
                              </div>
                            </div>`
          memberCards += memberCard
        })
      }
      return memberCards
    }

    function renderNewTeamMember(team_member){
      const member =  team_member.member
      const project =  team_member.project
      const newMemberCard = `<div class="member-card" id="team-member-${member.id}-${project.id}" data-member-id="${member.id}">
                                <div class="member-img">
                                    <img src="${member.image_url}" alt="${member.name}">
                                </div>
                                <div class="delete-team-member">
                                  <span class="trash-can" data-team-member-id="${team_member.id}"> 🗑</span>
                                </div>
                                <div class="member-desc">
                                  <p><strong>${member.name}</strong><br/>${member.role}</p>
                                </div>
                              </div>`
      const cardContainer = document.querySelector(`div[data-project-id-team-members="${project.id}"]`)
      cardContainer.insertAdjacentHTML("beforeend",newMemberCard)
    }

    function createObject(data,method){
      const object = {
        method:method,
        headers:{
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }
      if(!this.isEmpty(data)){
        object["body"]= JSON.stringify(data)
      }
      return object
    }

    function isEmpty(obj) {
      return Object.keys(obj).length === 0;
    }

    function renderMemberOptionsForNewProject(projectId){
      const select = document.querySelector(`select[data-project-id="${projectId}"]`)
      fetch(MEMBERS_URL)
      .then(resp=>resp.json())
      .then(members=>renderMemberOption(members,select))
      .catch(err => console.log(err))
    }

    function renderOption(card,containerClass){
      const imageUrl  = card.querySelector("img").src
      const memberId  = card.dataset.memberId
      
      const eligibleMembersContainer = document.querySelector(`.${containerClass}`);
      const option = `<div class="member-card" style="border-radius: 50%;">
                        <div class="member-img" style="border-radius: 50%;">
                            <img class="selectable-member" src="${imageUrl}" alt="" data-member-id="${memberId}">
                          </div>
                      </div>`
      eligibleMembersContainer.insertAdjacentHTML("beforeend",option)
    }

    function updateTaskCard(task){
      const taskCard = document.querySelector(`[data-task-id='${task.id}']`)
      taskCard.querySelector("li strong").textContent = task.name
      taskCard.querySelector("li span").textContent = task.priority
      const taskMembers =taskCard.querySelector(".task-assign-members")
      taskMembers.innerHTML = ""
      taskMembers.innerHTML = renderTaskMembers(task.members)
    }

    function addClickEvents(){


      document.querySelector("#add-project").addEventListener("click",e=>{
        const form =  document.querySelector("#new-project-form")
        const name = form.name.value;
        const deadline =  form.deadline.value;
        if (name === "" || deadline ===""){
          alert(MESSAGE)
        }else{
          serverData = createObject({name,deadline},"POST")
          fetch(PROJECTS_URL,serverData)
          .then(resp=>resp.json())
          .then(project => {
            renderProjectDiv(project)
            renderMemberOptionsForNewProject(project.id)
            initializeTooltip()
            $('#new-project-form-modal').modal('hide')
            form.reset()
          })
          .catch(err=> console.log(err))
        }
      })

      document.querySelector("#new-task").addEventListener("click",e=>{
        const myForm = document.querySelector("#new-task-form")
        const name = myForm.name.value
        const priority  = myForm.priority.value
        const projectId = myForm.dataset.projectId
        const selectedMembers = Array.from(document.querySelectorAll(".i-pick-you"));
        let memberIds = [];
        if (!!selectedMembers.length){
          memberIds  = selectedMembers.map(member=> member.dataset.memberId)
        }
        if(name === "" || priority ===""){
          alert(MESSAGE)
        }else{
          serverData = createObject({name:name,priority:priority,project_id:projectId,memberIds},"POST")
          fetch(TASKS_URL,serverData)
          .then(resp => resp.json())
          .then(task=>{
            const taskCardContainer = document.querySelector(`#taskContainer${projectId}`)
            const taskCard = createTaskCard(task)
            taskCardContainer.insertAdjacentHTML("beforeend",taskCard)
            initializeTooltip()
            $("#new-task-form-modal").modal('hide')
            myForm.reset()
            const eligibleMembersContainer = document.querySelector(".task-eligible-member");
            eligibleMembersContainer.innerHTML=""
            
          })
        }
      })

      document.querySelector("#edit-task").addEventListener("click",e=>{
        const myForm = document.querySelector("#edit-task-form")
        const name = myForm.name.value
        const priority  = myForm.priority.value
        const taskId = myForm.dataset.taskId
        const selectedMembers = Array.from(document.querySelectorAll(".i-pick-you"));
        let memberIds = [];
        if (!!selectedMembers.length){
          memberIds  = selectedMembers.map(member=> member.dataset.memberId)
        }
        if(name === "" || priority ===""){
          alert(MESSAGE)
        }else{
          const serverData = createObject({name:name,priority:priority,memberIds},"PATCH")
          fetch(`${TASKS_URL}/${taskId}`,serverData)  
          .then(resp => resp.json())
          .then(task=>{
            updateTaskCard(task)
            initializeTooltip()
            $("#edit-task-form-modal").modal('hide')
            const eligibleMembersContainer = document.querySelector(".edit-task-eligible-member");
            eligibleMembersContainer.innerHTML=""
            myForm.reset()
          })
        }
      })

      document.querySelector('#delete-task').addEventListener("click",e=>{
          const taskId =  document.querySelector("#edit-task-form").dataset.taskId
          const serverData = createObject({ },"DELETE")
          fetch(`${TASKS_URL}/${taskId}`,serverData)  
          .then(resp => resp.json())
          .then(task=>{
            document.querySelector(`[data-task-id='${task.id}']`).remove()
            $("#edit-task-form-modal").modal('hide')
          })
      })

      document.querySelector("#delete-project").addEventListener("click", e =>{
        const projectId = e.target.dataset.projectId
        const serverData = createObject({},"DELETE")
        fetch(`${PROJECTS_URL}/${projectId}`,serverData)
        .then(resp => resp.json())
        .then(project =>{
            const  projectCard = document.querySelector(`div[data-entire-project-id="${project.id}"]`)
            projectCard.remove()
          $("#confirm-delete-project").modal("hide")
        })
      
      })

      document.addEventListener("click",e=>{
        if(e.target.classList.contains("btn-edit-task")){
          const taskId = e.target.dataset.taskId
          const projectId = e.target.dataset.taskProjectId
          const taskName  =  document.querySelector(`div[data-task-id="${taskId}"] ul`).querySelector("li strong").textContent
          const taskPriority  =  document.querySelector(`div[data-task-id="${taskId}"] ul`).querySelector("li span").textContent
          const myForm = document.querySelector("#edit-task-form")
          myForm.dataset.taskId = taskId
          myForm.name.value = taskName
          myForm.priority.value = taskPriority
          const cards = document.querySelector(`div[data-project-id-team-members="${projectId}"]`).querySelectorAll(".member-card")
          const eligibleMembersContainer = document.querySelector(".edit-task-eligible-member");
          eligibleMembersContainer.innerHTML=""
          cards.forEach(card=>{
              renderOption(card,"edit-task-eligible-member")
          })
          const memberIds = Array.from(document.querySelector(`div[data-task-id="${taskId}"]`).querySelectorAll(".task-member-img")).map(x=>x.dataset.taskMemberId)
          const allProjectMembers = Array.from(document.querySelector(".edit-task-eligible-member").querySelectorAll(".selectable-member"))
          allProjectMembers.forEach(member =>{
            if(memberIds.includes(member.dataset.memberId)){
              member.classList.toggle("i-pick-you")
            }
          })

          $("#edit-task-form-modal").modal('show')
        }
        if (e.target.classList.contains("btn-task-modal")){
          const projectId = e.target.dataset.projectId
          const cards = document.querySelector(`div[data-project-id-team-members="${projectId}"]`).querySelectorAll(".member-card")
          const eligibleMembersContainer = document.querySelector(".task-eligible-member");
          eligibleMembersContainer.innerHTML=""
          cards.forEach(card=>{
              renderOption(card,"task-eligible-member")
          })
          const myForm = document.querySelector("#new-task-form")
          myForm.dataset.projectId = projectId
          $("#new-task-form-modal").modal('show')
        }
        if (e.target.classList.contains("selectable-member")){
          e.target.classList.toggle("i-pick-you")
        }
        if(e.target.classList.contains("btn-edit-project")){
          const projectId = e.target.dataset.projectId
          const name =e.target.dataset.projectName;
          const deadline=e.target.dataset.projectDeadline;
          const form =  document.querySelector("#edit-project-form")
          form.name.value = name
          form.deadline.value = deadline
          form.dataset.projectId = projectId
        }
        if(e.target.id ==="edit-project"){
          const myForm = document.querySelector("#edit-project-form")
          const newName = myForm.name.value
          const newDeadline = myForm.deadline.value 
          const projectId = myForm.dataset.projectId
          if(newName === "" || newDeadline ===""){
            alert(MESSAGE)
          }else{
            const serverData = createObject({name:newName,deadline:newDeadline},"PATCH")
            fetch(`${PROJECTS_URL}/${projectId}`,serverData)
            .then(resp => resp.json())
            .then(project => {
                const projectNameStrongTag = document.querySelector(`button[data-project-id="${project.id}"]`)
                                                      .closest("ul").querySelector(".project-name")
                const projectDeadlineSpanTag = document.querySelector(`button[data-project-id="${project.id}"]`)
                                                      .closest("ul").querySelector(".project-deadline")

                projectNameStrongTag.textContent = project.name
                projectDeadlineSpanTag.textContent = project.deadline
                $('#edit-project-form-modal').modal('hide')
                myForm.reset()
              })
            .catch(err => console.log(err))
          }
        }
        if (e.target.className === "trash-can"){
          const teamMemberId = e.target.dataset.teamMemberId
          const serverData = createObject({ },"DELETE")
          fetch(`${TEAM_MEMBERS_URL}/${teamMemberId}`,serverData)  
          .then(resp => resp.json())
          .then(teamMember=>{
            const teamMemberCard = document.querySelector(`#team-member-${teamMember.member_id}-${teamMember.project_id}`)
            teamMemberCard.remove()
            const taskCards = Array.from(document.querySelector(`#taskContainer${teamMember.project_id}`).querySelectorAll('.task-card'))       
            taskCards.forEach(taskCard =>{
              if(!!taskCard.querySelector(`div[data-task-member-id="${teamMember.member_id}"]`)){
                taskCard.querySelector(`div[data-task-member-id="${teamMember.member_id}"]`).remove()
              }
            })
            
          })
        }
        if (e.target.classList.contains("delete-project")){
          const projectId = e.target.closest("ul").dataset.projectId 
          document.querySelector("#delete-project").dataset.projectId = projectId
          $("#confirm-delete-project").modal("show")
        }
       
      })
    }

    function addSubmitEvents(){
      document.querySelector("#login-form").addEventListener("submit",e=>{
        e.preventDefault();
        const email = document.querySelector("#exampleInputEmail1").value
        const password = document.querySelector("#exampleInputPassword1").value
        if(email === "" || password ==""){
          alert(MESSAGE)
        }else{
          document.querySelector("div.login-wrapper").classList.toggle("d-none")
          document.querySelector("main").classList.toggle("d-none")
        }
       

      })
      document.querySelector(".logout-form").addEventListener("submit",e=>{
        e.preventDefault();
        document.querySelector("div.login-wrapper").classList.toggle("d-none")
        document.querySelector("main").classList.toggle("d-none")
      })

      document.addEventListener("submit", e=>{
        e.preventDefault()
        if (e.target.classList.contains("add-team-member-form")){
          const myForm = e.target
          const projectId = myForm.dataset.projectId
          const memberId = myForm.member_id.value
          const serverData = createObject({project_id:projectId,member_id:memberId},"POST")
          fetch(TEAM_MEMBERS_URL,serverData)
          .then(resp => resp.json())
          .then(team_member => {
              const element = document.querySelector(`#team-member-${team_member.member.id}-${team_member.project.id}`)
              if (!!element){
                alert(`${team_member.member.name} has already been added to this project`)
              }else{
                renderNewTeamMember(team_member)
              }
            })          
        }
      })
    }
