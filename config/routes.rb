Gustr::Application.routes.draw do
  devise_for :users
  root to: 'welcome#index'
  resources :businesses
  resources :events
end
