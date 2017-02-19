class Api::MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)

    if @message.save
      @channel = Channel.find(params[:message][:channel_id])
      @messages = @channel.messages.order(:created_at).reverse
      author = User.find(@message.user_id)

      # new_messages = {
      #   "messages" => @messages.map do |msg|
      #     {
      #       "id" => msg.id,
      #       "content" => msg.content,
      #       "content_type" => msg.content_type,
      #       "updated_at" => msg.updated_at,
      #       "author"  => {
      #         "id" => User.find(msg.user_id).id,
      #         "username" => User.find(msg.user_id).username,
      #         "photo_url" => User.find(msg.user_id).photo_url
      #       }
      #     }
      #   end
      # }
      #
      # Pusher.trigger(@channel.name, 'new_message', {
      #   messages: new_messages
      # })

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

      # Pusher.trigger(@channel.name, 'triggerFetch', {
      #   params: { channelId: @channel.id,
      #             userId: author.id }
      # })

      # render 'api/channels/show'
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def message_params
    params.require(:message).permit(:user_id, :channel_id, :content)
  end
end
