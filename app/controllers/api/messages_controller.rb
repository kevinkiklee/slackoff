class Api::MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)
    if @message.save
      @channel = Channel.find(params[:message][:channel_id])
      # debugger
      @messages = @channel.messages.order(:created_at).reverse
      render 'api/channels/show'
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def message_params
    params.require(:message).permit(:user_id, :channel_id, :content)
  end
end
