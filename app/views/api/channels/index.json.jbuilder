json.array! @channels do |channel|
  json.extract! channel, :id, :name, :description, :created_at, :display_name
  json.userCount channel.users.count
end
