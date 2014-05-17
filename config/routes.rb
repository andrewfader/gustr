Gustr::Application.routes.draw do
  devise_for :users, controllers: {registrations: 'registrations', omniauth_callbacks: "users/omniauth_callbacks" }
  root to: 'welcome#index'
  # resources :businesses
  # resources :events
  # resources :users
  # resources :keywords do
    # get :autocomplete_keyword_name, on: :collection
  # end
  resources :stories do
    get :wizard
    get :publish
    get :tag
    resources :graphics
  end
  get :storybooks, controller: 'stories'
  get :genres, controller: 'stories'
  get :genre, controller: 'stories'
  get :tags, controller: 'stories'
  get :search, controller: 'stories'
  resources :welcome do
    get :index
  end
  get :privacy, controller: 'welcome'
  get :tos, controller: 'welcome'
  get :welcome1, controller: 'welcome'
  get :welcome2, controller: 'welcome'
  get :about, controller: 'welcome'
  resources :users
end
