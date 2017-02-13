Rails.application.routes.draw do
  get '/test', to: 'pusher_test#test'
end
