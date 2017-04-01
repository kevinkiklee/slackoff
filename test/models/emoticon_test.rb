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

require 'test_helper'

class EmoticonTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
