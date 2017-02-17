class CreateSubscriptions < ActiveRecord::Migration[5.0]
  def change
    create_table :subscriptions do |t|
      t.integer :user_id, null: false
      t.integer :channel_id, null: false
      t.timestamps
    end

    add_index :subscriptions, :user_id, unique: true
    add_index :subscriptions, :channel_id, unique: true
  end
end
