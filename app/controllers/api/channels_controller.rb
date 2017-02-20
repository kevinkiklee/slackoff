class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.all
    render 'api/channels/index'
  end

  def public
    @channels = Channel.all.where(private: false).order(:name)
    @userCount = 5
    render 'api/channels/index'
  end

  def show
    @channel = Channel.find(params[:id])
    @messages = @channel.messages.order(:created_at).reverse

    render 'api/channels/show'
  end
end
