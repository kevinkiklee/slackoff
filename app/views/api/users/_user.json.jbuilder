current_channel = user.channels.first.id

json.extract! user,
  :id,
  :username,
  :email,
  :photo_url

json.current_channel current_channel

json.subscriptions user.channels do |channel|
  json.extract! channel, :id, :name, :description
end
