class Api::MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)

    if @message.save
      @channel = Channel.includes(:messages).find(params[:message][:channel_id])
      @messages = @channel.messages.order(:created_at).reverse
      author = User.find(@message.user_id)

      new_message = {
        "id" => @message.id,
        "content" => @message.content,
        "content_type" => @message.content_type,
        "updated_at" => @message.updated_at,
        "author"  => {
          "id" => author.id,
          "username" => author.username,
          "photo_url" => author.photo_url
        }
      }

      Pusher.trigger(@channel.name, 'message', {
        messages: new_message
      })

    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def message_params
    params.require(:message).permit(:user_id, :channel_id, :content)
  end
end
