Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:index, :show, :create] do
      resources :channels, only: [:show]
    end

    resources :subscriptions, only: [:create]
    resource :subscriptions, only: [:destroy]

    resources :channels, only: [:index, :create]
    get 'channels/public' => 'channels#public'

    resources :messages, only: [:create]

    resource :session, only: [:create, :destroy, :show]
  end
end
