class AddIndicesToMessages < ActiveRecord::Migration[5.0]
  def change
    add_index :messages, :user_id, unique: false
    add_index :messages, :channel_id, unique: false
  end
end
