class Api::EmoticonsController < ApplicationController
  def create
    emoticon = Emoticon.new(emoticon_params)

    if emoticon.save
      message = emoticon.message
      channel = message.channel
      emoticons = message.emoticons.order(:created_at)

      Pusher.trigger(channel.id,
                     'editMessage',
                     { message: message,
                       emoticons: emoticons });
    end
  end

  def destroy
    emoticon = Emoticon.find(params[:id])
    emoticon.destroy

    message = emoticon.message
    channel = message.channel
    emoticons = message.emoticons.order(:created_at)

    Pusher.trigger(channel.id, 'editMessage',
                   { message: message,
                     emoticons: emoticons });
  end

  def emoticon_params
    params.require(:emoticon).permit(:user_id, :message_id, :icon)
  end
end
