json.array! @users do |user|
  json.id user.id
  json.username user.username
  json.email user.email
  json.current_channel user.current_channel
  json.photo_url asset_path(user.avatar.url)
end
