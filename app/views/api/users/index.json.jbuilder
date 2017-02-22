# json.array! @users do |user|
#   json.extract! channel, :id, :name, :description, :created_at
#   json.userCount channel.users.count
# end

json.array! @users, :id, :username, :photo_url
