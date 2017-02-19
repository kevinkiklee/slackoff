# config/initializers/pusher.rb
require 'pusher'

Pusher.app_id = '304183'
Pusher.key = '6dff216f2c5d022ed6ae'
Pusher.secret = '82e484e893ae0da52c7f'

# Pusher.app_id = ENV['pusher_app_id']
# Pusher.key = ENV['pusher_key']
# Pusher.secret = ENV['pusher_secret']

# Pusher.app_id = Figaro.env.pusher_app_id
# Pusher.key = Figaro.env.pusher_key
# Pusher.secret = Figaro.env.pusher_secret

Pusher.logger = Rails.logger
Pusher.encrypted = true
