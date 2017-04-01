class Api::EmoticonsController < ApplicationController
  def create
    # debugger
    @emoticon = Emoticon.new(emoticon_params)

    if @emoticon.save
      @message = @emoticon.message
      @channel = @message.channel
      # @emoticons = @message.emoticons.all
      # author = User.find(@message.user_id)
      #
      # message = {
      #   "id" => @message.id,
      #   "content" => @message.content,
      #   "content_type" => @message.content_type,
      #   "updated_at" => @message.updated_at,
      #   "author"  => {
      #     "id" => author.id,
      #     "username" => author.username,
      #     "photo_url" => ActionController::Base.helpers.asset_path(author.avatar.url)
      #   },
      #   "emoticons" => @emoticons
      # }

      Pusher.trigger(@channel.id, 'editMessage', { message: @message });

      # Pusher.trigger(@channel.id, 'message', {
      #   messages: message
      # })
    else
      render json: @emoticon.errors.full_messages, status: 422
    end
  end

  def destroy
  end

  def emoticon_params
    params.require(:emoticon).permit(:user_id, :message_id, :icon)
  end

end
