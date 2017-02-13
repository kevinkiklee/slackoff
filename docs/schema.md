# DB Schema

## User

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


## Channel

| column      | type      | attribute           |
|-------------|-----------|---------------------|
| name        | `string`  | `unique` `presence` |
| description | `string`  |                     |
| private     | `boolean` | `default: false`    |

- **Has Many**
  - Subscriptions
  - Messages
  - Users through Subscriptions


## Message

| column     | type      | attribute  |
|------------|-----------|------------|
| content    | `string`  |            |
| type       | `string`  | `presence` |
| user_id    | `integer` | `presence` |
| channel_id | `integer` | `presence` |

- **Belongs To**
  - User
  - Channel


## Subscription

| column     | type     | attribute  |
|------------|----------|------------|
| user_id    | `string` | `presence` |
| channel_id | `string` | `presence` |

- **Belongs To**
  - User
  - Channel
