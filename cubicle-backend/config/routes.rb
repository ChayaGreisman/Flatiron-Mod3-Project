Rails.application.routes.draw do
  resources :assigments
  resources :team_members
  resources :tasks
  resources :members
  resources :projects
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
