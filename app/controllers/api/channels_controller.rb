class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.all.includes(:messages)
    render 'api/channels/index'
  end

  def public
    @channels = Channel.includes(:messages).all.where(private: false).order(:name)
    render 'api/channels/index'
  end

  def show
    @channel = Channel.includes(:messages).find(params[:id])
    @users = @channel.users.order(:username)
    @messages = @channel.messages.order(:created_at).reverse
    @user_count = @channel.users.count
    render 'api/channels/show'
  end
end
