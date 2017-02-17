class AddCurrentChannelToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :current_channel, :integer
  end
end
