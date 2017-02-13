## DB Schema

#### User
- **Has Many**
  - Subscriptions
  - Messages
  - Channels through Subscriptions
- username `string` `unique` `presence`
- email `string` `unique` `presence`
- photo_url `string`
- password_digest `string` `presence`
- session_token `string` `presence`

#### Channel
- **Has Many**
  - Subscriptions
  - Messages
  - Users through Subscriptions
- name `string` `unique` `presence`
- description `string`

#### Message
- **Belongs To**
  - User
  - Channel
- content `string`
- content_type `string`
- user_id `string` `presence`
- channel_id `string` `presence`

#### Subscription
- **Belongs To**
  - User
  - Channel
- user_id `string` `presence`
- channel_id `string` `presence`
