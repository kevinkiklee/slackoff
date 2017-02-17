#### USERS ####

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

#### CHANNELS ####

Channel.destroy_all

channels = %w(westeros
              essos
              winterfell
              the-wall
              riverrun
              kings-landing
              casterly-rock
              dorne
              storms-end
              harrenhal
              highgarden
              iron-throne
              lannisters
              starks
              targaryens
              cute-wolf-pics
              )

norris = ['Chuck Norris can binary search unsorted data',
          "When Chuck Norris\' code fails to compile the compiler apologises",
          "There is nothing regular about Chuck Norris' expressions",
          "The class object inherits from Chuck Norris",
          "Chuck Norris' preferred IDE is hexedit",
          "Chuck Norris can't test for equality because he has no equal",
          "Chuck Norris hosting is 101% uptime guaranteed",
          "Chuck Norris can compile syntax errors",
          "Chuck Norris programs do not accept input",
          "Chuck Norris's beard can type 140 wpm",
          "When Chuck Norris points to null, null quakes in fear",
          "Chuck Norris doesn't pair program",
          "Chuck Norris went out of an infinite loop",
          "Chuck Norris can instantiate an abstract class",
          "When Chuck Norris gives a method an argument, the method loses",
          "Chuck Norris' beard is immutable"
          ]

channels.each.with_index do |channel, i|
  ch = Channel.new(name: channel,
                   description: norris[i])
  ch.save
end

### Subscriptions

Subscription.destroy_all

user_start = User.first.id
user_end = User.last.id

ch_start = Channel.first.id
ch_end = Channel.last.id

(user_start..user_end).to_a.each do |i|
  (3..6).to_a.sample.times do
    Subscription.create(user_id: User.find(i).id,
                        channel_id: Channel.find((ch_start..ch_end).to_a.sample).id
                        )
  end
end
