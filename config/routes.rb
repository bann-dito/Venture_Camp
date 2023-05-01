Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: :create
    resource :session, only: [:show, :create, :destroy]
    resources :listings, only: [:index, :show]
    resources :reviews, only: [:create, :destroy, :index]
  end

  # Catch-all route to serve up frontend files
  get '*path', to: 'static_pages#frontend', constraints: ->(request) {!request.xhr? && request.format.html?}

end
