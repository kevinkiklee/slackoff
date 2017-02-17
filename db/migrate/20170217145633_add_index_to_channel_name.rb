class AddIndexToChannelName < ActiveRecord::Migration[5.0]
  def change
    add_index :channels, :name, unique: true
  end
end
