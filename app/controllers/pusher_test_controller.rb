class PusherTestController < ApplicationController
  def test
    Pusher.trigger('my-channel', 'my-event', {
      message: 'hello world'
    })
  end
end
