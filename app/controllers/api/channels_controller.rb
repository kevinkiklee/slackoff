class Api::ChannelsController < ApplicationController
  def show
    @channel = Channel.find(params[:id])
    @messages = @channel.messages.order(:created_at).reverse
    # @messages = @channel.messages.reverse
    render 'api/channels/show'
  end
end
