json.extract! channel, :id, :name, :description

# channel_messages = channel.messages.reverse

json.messages messages do |message|
  json.extract! message, :id, :content, :content_type, :updated_at
  json.author User.find(message.user_id), :id, :username, :photo_url
end
