class AddUniqueIndexToEmoticon < ActiveRecord::Migration[5.0]
  def change
    add_index :emoticons, [:user_id, :message_id, :icon], unique: true
  end
end
