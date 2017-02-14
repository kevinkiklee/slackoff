User.destroy_all

jonsnow = User.new(username: 'jonsnow', email: 'i.know.nothing@whoami.com')
jonsnow.password = 'jonsnow'
jonsnow.save

tyrion = User.new(username: 'tyrion', email: 'tyrion@lannister.com')
tyrion.password = 'tyrion'
tyrion.save

nedstark = User.new(username: 'nedstark', email: 'eddard@stark.com')
nedstark.password = 'nedstark'
nedstark.save

daenerys = User.new(username: 'daenerys', email: 'daenerys@targaryen.com')
daenerys.password = 'daenerys'
daenerys.save
