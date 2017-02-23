json.extract! channel, :id, :name, :description, :created_at, :display_name, :private

json.userCount user_count

json.users users do |user|
  json.extract! user, :id, :username, :photo_url
end

### roflcucks
if messages.empty?
  json.messages []
else
  json.messages messages do |message|
    json.extract! message, :id, :content, :content_type, :updated_at
    json.author User.find(message.user_id), :id, :username, :photo_url
  end
end
