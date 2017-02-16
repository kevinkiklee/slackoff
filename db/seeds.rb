User.destroy_all

guest = User.new(username: 'guest', email: 'guest@guest.com')
guest.password = 'guestlogin'
guest.save

jonsnow = User.new(username: 'jon.snow', email: 'i.know.nothing@whoami.com')
jonsnow.password = 'jon.snow'
jonsnow.save

tyrion = User.new(username: 'tyrion', email: 'tyrion@lannister.com')
tyrion.password = 'tyrion'
tyrion.save

nedstark = User.new(username: 'ned.stark', email: 'eddard@stark.com')
nedstark.password = 'ned.stark'
nedstark.save

daenerys = User.new(username: 'daenerys', email: 'daenerys@targaryen.com')
daenerys.password = 'daenerys'
daenerys.save
