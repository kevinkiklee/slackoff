class Api::SubscriptionsController < ApplicationController
  def create
    @subscription = current_user.subscriptions.new(sub_params)

    if @subscription.save
      @channel = Channel.find(@subscription.channel_id)
      @messages = @channel.messages.order(:created_at).reverse

      render 'api/channels/show'
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def destroy
  end

  def sub_params
    params.require(:sub).permit(:channel_id)
  end
end
