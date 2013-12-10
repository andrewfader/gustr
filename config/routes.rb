Gustr::Application.routes.draw do
  # devise_for :users
  root to: 'welcome#index'
  # resources :businesses
  # resources :events
  # resources :users
  # resources :keywords do
    # get :autocomplete_keyword_name, on: :collection
  # end
  resources :places do
    get :tag
    resources :graphics
  end
end
