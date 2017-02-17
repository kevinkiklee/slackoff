class RemoveIndicesInSubscriptions < ActiveRecord::Migration[5.0]
  def change
    remove_index :subscriptions, :user_id
    add_index :subscriptions, :user_id, unique: false

    remove_index :subscriptions, :channel_id
    add_index :subscriptions, :channel_id, unique: false
  end
end
