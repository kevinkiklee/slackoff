json.array! @channels do |channel|
  json.extract! channel, :id, :name, :description, :created_at, :display_name
  json.userCount channel.users.count
end

# id: action.channel.id,
# name: action.channel.name,
# description: action.channel.description,
# userCount: 5,
# messages: action.channel.messages
