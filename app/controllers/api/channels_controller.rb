class Api::ChannelsController < ApplicationController
  def show
    @channel = Channel.find(params[:id])
    @messages = @channel.messages.reverse
    render 'api/channels/show'
  end
end
