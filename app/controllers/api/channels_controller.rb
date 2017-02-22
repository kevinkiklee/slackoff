# belong to a user/creator?

class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.all.includes(:messages => [:user])
    render 'api/channels/index'
  end

  def create
    debugger

    # @channel = Channel.new(channel_params)

    if @channel.save
      @users = [current_user]
      @messages = []
      @user_count = 1

      render 'api/channel/show'
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
    params.require(:channel).permit(:name, :description, :private, users: [])
  end
end
