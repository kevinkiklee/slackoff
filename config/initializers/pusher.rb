# config/initializers/pusher.rb
require 'pusher'

Pusher.app_id = '301567'
Pusher.key = 'd46870f8b7c4c1636fca'
Pusher.secret = 'a700f068ed42ab7bd614'
Pusher.logger = Rails.logger
Pusher.encrypted = true
