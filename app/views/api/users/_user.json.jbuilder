json.extract! user,
  :id,
  :username,
  :email,
  :photo_url,
  :current_channel

json.subscriptions channels do |channel|
  json.extract! channel, :id, :name, :description, :display_name
end

json.directMessages direct_messages do |direct_message|
  json.extract! direct_message, :id, :name, :description
  json.users direct_message.users.where.not(id: current_user.id), :id, :username
end
