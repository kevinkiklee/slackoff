class AddDisplayNameToChannel < ActiveRecord::Migration[5.0]
  def change
    add_column :channels, :display_name, :string
  end
end
