json.extract! user,
  :id,
  :username,
  :email,
  # :photo_url,
  :current_channel

json.photo_url asset_path(user.avatar.url)

json.subscriptions channels do |channel|
  json.extract! channel, :id, :name, :description, :display_name
end

json.directMessages direct_messages do |direct_message|
  json.extract! direct_message, :id, :name, :description, :display_name
  json.users direct_message.users.where.not(id: current_user.id), :id, :username
end
