class ChangeTypeColumnInMessages < ActiveRecord::Migration[5.0]
  def change
    rename_column :messages, :type, :content_type
  end
end
