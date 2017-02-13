## DB Schema

#### User
- **Has Many**
  - Subscriptions
  - Messages
  - Channels through Subscriptions

  | column          | type     | attribute           |
  |-----------------|----------|---------------------|
  | username        | `string` | `unique` `presence` |
  | email           | `string` | `unique` `presence` |
  | photo_url       | `string` | `string`            |
  | password_digest | `string` | `unique` `presence` |
  | session_token   | `string` | `unique` `presence` |

#### Channel
- **Has Many**
  - Subscriptions
  - Messages
  - Users through Subscriptions

  | column      | type      | attribute           |
  |-------------|-----------|---------------------|
  | name        | `string`  | `unique` `presence` |
  | description | `string`  |                     |
  | private     | `boolean` | `default: false`    |

#### Message
- **Belongs To**
  - User
  - Channel

  | column     | type      | attribute  |
  |------------|-----------|------------|
  | content    | `string`  |            |
  | type       | `string`  | `presence` |
  | user_id    | `integer` | `presence` |
  | channel_id | `integer` | `presence` |

#### Subscription
- **Belongs To**
  - User
  - Channel

  | column     | type     | attribute  |
  |------------|----------|------------|
  | user_id    | `string` | `presence` |
  | channel_id | `string` | `presence` |
