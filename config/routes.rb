Gustr::Application.routes.draw do
  devise_for :users, controllers: {registrations: 'registrations', omniauth_callbacks: "users/omniauth_callbacks" }
  root to: 'stories#index'
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
end
