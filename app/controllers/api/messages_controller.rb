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
          "photo_url" => author.avatar.url
        }
      }

      Pusher.trigger(@channel.id, 'message', {
        messages: new_message
      })

      Pusher.trigger('directMessage', 'notify', {
        authorId: author.id,
        author: author.username,
        channelId: @channel.id,
        private: @channel.private
      })

      Pusher.trigger('application', 'update', {});

    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def update
    @message = Message.find(params[:id])
    @message.update(message_params)
    @channel = @message.channel

    Pusher.trigger(@channel.id, 'editMessage', { message: @message });
    render json: @message
  end

  def destroy
    @message = Message.find(params[:id])
    @channel = @message.channel
    @message.destroy

    Pusher.trigger(@channel.id, 'deleteMessage', { id: @message.id });
    render json: @message.id
  end

  def message_params
    params.require(:message).permit(:user_id, :channel_id, :content)
  end
end
