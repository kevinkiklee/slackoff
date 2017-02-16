User.destroy_all

guest = User.new(username: 'guest', email: 'guest@guest.com')
guest.password = 'guestlogin'
guest.save

users = %w(jon.snow
           ned.stark
           tyrion.lannister
           daenerys.targaryen
           jaime.lannister
           petyr.baelish
           arya.stark
           sandor.clegane
           theon.greyjoy
           samwell.tarly
          )

users.each do |user|
  char = User.new(username: user,
                  email: Faker::Internet.email,
                  photo_url: Faker::Avatar.image(user, "50x50")
                 )
  char.password = user
  char.save
end

#
# jonsnow = User.new(username: 'jon.snow', email: 'i.know.nothing@whoami.com')
# jonsnow.password = 'jon.snow'
# jonsnow.save
#
# tyrion = User.new(username: 'tyrion', email: 'tyrion@lannister.com')
# tyrion.password = 'tyrion'
# tyrion.save
#
# nedstark = User.new(username: 'ned.stark', email: 'eddard@stark.com')
# nedstark.password = 'ned.stark'
# nedstark.save
#
# daenerys = User.new(username: 'daenerys', email: 'daenerys@targaryen.com')
# daenerys.password = 'daenerys'
# daenerys.save
#
#
# 10.times do
#   user = User.new(username: Faker::GameOfThrones.character.gsub(' ','.').downcase)
# end
#
#
# Faker::Avatar.image("username", "50x50")
# Faker::Internet.email
