class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.text    :content
      t.string  :type, default: 'regular'
      t.integer :user_id, null: false
      t.integer :channel_id, null: false
      t.timestamps
    end
  end
end
