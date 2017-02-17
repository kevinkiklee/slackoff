class AddIndexToSubscription < ActiveRecord::Migration[5.0]
  def change
    add_index :subscriptions, [:user_id, :channel_id], unique: true
  end
end
