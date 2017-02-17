# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  email           :string           not null
#  photo_url       :string
#  password_digest :string
#  session_token   :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
	attr_reader :password

	validates :username,
            :password_digest,
            :session_token,
            :email, presence: true

	validates :username, :email, uniqueness: true
	validates :password, { length: { minimum: 6 }, allow_nil: :true }

  has_many :subscriptions
  has_many :channels, through: :subscriptions

	after_initialize :ensure_session_token
	before_validation :ensure_session_token_uniqueness

	def password=(password)
		self.password_digest = BCrypt::Password.create(password)
		@password = password
	end

	def self.find_by_credentials(username, password)
		user = User.find_by(username: username)
		return nil unless user
		user.password_is?(password) ? user : nil
	end

	def password_is?(password)
		BCrypt::Password.new(self.password_digest).is_password?(password)
	end

	def reset_session_token!
		self.session_token = new_session_token
		ensure_session_token_uniqueness
		self.save
		self.session_token
	end

	private

	def ensure_session_token
		self.session_token ||= new_session_token
	end

	def new_session_token
    SecureRandom.urlsafe_base64(16)
	end

	def ensure_session_token_uniqueness
		while User.find_by(session_token: self.session_token)
			self.session_token = new_session_token
		end
	end
end
