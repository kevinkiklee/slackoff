# config/initializers/pusher.rb
require 'pusher'

Pusher.app_id = ENV["PUSHER_APP_ID"]
Pusher.key    = ENV["PUSHER_KEY"]
Pusher.secret = ENV["PUSHER_SECRET"]

# Pusher.app_id = ENV['pusher_app_id']
# Pusher.key = ENV['pusher_key']
# Pusher.secret = ENV['pusher_secret']

# Pusher.app_id = Figaro.env.pusher_app_id
# Pusher.key = Figaro.env.pusher_key
# Pusher.secret = Figaro.env.pusher_secret

Pusher.logger = Rails.logger
Pusher.encrypted = true
