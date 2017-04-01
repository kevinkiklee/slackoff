# == Schema Information
#
# Table name: emoticons
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  message_id :integer          not null
#  icon       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Emoticon < ApplicationRecord
  belongs_to :user
  belongs_to :message

  validates :user, :message, :icon, presence: true
  validates :icon, uniqueness: { scope: [:user_id, :message_id] }
end
