# == Schema Information
#
# Table name: messages
#
#  id           :integer          not null, primary key
#  content      :text
#  content_type :string           default("regular")
#  user_id      :integer          not null
#  channel_id   :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Message < ApplicationRecord
  belongs_to :user
  belongs_to :channel
  validates :content, :user, :channel, presence: true
end
