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

#### Live Chat

Pusher API is utilized for maintaining Websocket TCP-based protocol which allows bi-directional communication.  

#### Channels

Public channels can be created/joined/subscribed by all users on the application.

#### Direct/Team Messaging

Direct and Team messaging capability is implemented through creation of private channels.

## Structure

#### FrontEnd - React

##### Frontpage
- Banner
- Authentication

##### Main Application
- User Section (Left column)
- Message Section (Center column)
- Channel Section (Right column)

#### BackEnd DB Schema - Ruby on Rails / PostgreSQL

##### User

| column          | type     | attribute           |
|-----------------|----------|---------------------|
| username        | `string` | `unique` `presence` |
| email           | `string` | `unique` `presence` |
| photo_url       | `string` | `string`            |
| password_digest | `string` | `unique` `presence` |
| session_token   | `string` | `unique` `presence` |

- **Has Many**
  - Subscriptions
  - Messages
  - Channels through Subscriptions

##### Channel

| column      | type      | attribute           |
|-------------|-----------|---------------------|
| name        | `string`  | `unique` `presence` |
| description | `string`  |                     |
| private     | `boolean` | `default: false`    |

- **Has Many**
  - Subscriptions
  - Messages
  - Users through Subscriptions

##### Message

| column     | type      | attribute  |
|------------|-----------|------------|
| content    | `string`  |            |
| user_id    | `integer` | `presence` |
| channel_id | `integer` | `presence` |

- **Belongs To**
  - User
  - Channel

##### Subscription

| column     | type      | attribute  |
|------------|-----------|------------|
| user_id    | `integer` | `presence` |
| channel_id | `integer` | `presence` |

- **Belongs To**
  - User
  - Channel

## Future Release

* [ ] Notification
* [ ] Avatar Upload
* [ ] Search
* [ ] Emoticons
