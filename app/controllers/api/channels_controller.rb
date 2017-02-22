# belong to a user/creator?
require 'json'

class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.all.includes(:messages => [:user])
    render 'api/channels/index'
  end

  def create
    @channel = Channel.new(channel_params)

    users = params[:channel][:users]

    if @channel.save
      users.each do |i|
        user_id = users[i][:id].to_i
        Subscription.create(user_id: user_id, channel_id: @channel.id)
      end

      @users = @channel.users.order(:username)
      @messages = @channel.messages.order(:created_at).reverse
      @user_count = @channel.users.count

      render 'api/channels/show'
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def public
    @channels = Channel.includes(:messages => [:user]).all.where(private: false).order(:name)
    render 'api/channels/index'
  end

  def show
    @channel = Channel.includes(:users, :messages => [:user]).find(params[:id])
    @users = @channel.users.order(:username)
    @messages = @channel.messages.order(:created_at).reverse
    @user_count = @channel.users.count
    render 'api/channels/show'
  end

  def channel_params
    params.require(:channel).permit(:name, :description, :private)
    # params.require(:channel).permit(:name, :description, :private, users: [:user_id, :username])
  end
end
