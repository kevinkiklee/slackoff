# SlackOff

![SlackOff Main Application](/docs/screenshots/slackoff-main.jpg)

SlackOff is a clone of a popular chat client, Slack.

Live Site: [http://slackoff.today]

## Implementation

SlackOff utilizes the following:

- Ruby on Rails
- React/Redux
- Pusher API
- PostgreSQL

## Features

The chat application is composed of three main features:

### Live chat

Pusher API is utilized for creating Websocket connections which allows bi-directional communication.  

### Channels

Through a subscription SQL join table and Rails associations, a user can join many channels, and a channel can have many users.  Messages belongs to a user and a channel.  

### Direct/Team Messaging

Direct and Team messaging capability is implemented through creation of private channels.

## Structure

### FrontEnd - React

#### Frontpage
- Banner
- Authentication

#### Main Application
- User Section (Left column)
- Message Section (Center column)
- Channel Section (Right column)

### BackEnd - Ruby on Rails

#### User

- Has many channels
- Has many messages

#### Channel

- Has many users
- Has many messages
- Can be public or private

#### Subscription

- Belongs to a user
- Belongs to a channel

#### Message

- Belongs to a user
- Belongs to a channel

## Future Release

* [ ] Notification
* [ ] Avatar Upload
* [ ] Search
* [ ] Emoticons
