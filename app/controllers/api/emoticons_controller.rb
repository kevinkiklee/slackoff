class Api::EmoticonsController < ApplicationController
  def create
    @emoticon = Emoticon.new(emoticon_params)

    if @emoticon.save
      @message = @emoticon.message
      @channel = @message.channel

      Pusher.trigger(@channel.id,
                     'editMessage',
                     { message: @message,
                       emoticons: @message.emoticons });
    end
  end

  def destroy
  end

  def emoticon_params
    params.require(:emoticon).permit(:user_id, :message_id, :icon)
  end
end
