class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string  :username, null: false, unique: true
      t.string  :email, null: false, unique: true
      t.string  :photo_url
      t.string  :password_digest
      t.string  :session_token

      t.timestamps
    end

    add_index :users, :username, unique: true
  end
end
