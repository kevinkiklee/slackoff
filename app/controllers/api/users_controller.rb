class Api::UsersController < ApplicationController
  def index
    @users = User.all.order(:username)
    render 'api/users/index'
  end

  def show
    @user = User.includes(:channels).find(params[:id])
    @channels = @user.channels.where(private: false).order(:name)
    @direct_messages = @user.channels.includes(:users).where(private: true).order(:display_name)

    render "api/users/show"
  end

  def create
    # debugger
    @user = User.new(user_params)
    @user.avatar = params[:user][:photo_url]
    @user.current_channel = Channel.find_by(name: 'general').id

    if @user.save
      @user.subscriptions.create(channel_id: @user.current_channel)

      @channels = @user.channels.where(private: false).order(:name)
      @direct_messages = @user.channels.includes(:users).where(private: true).order(:name)

      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find_by(username: params[:user][:username])
    @user.update(user_params)

    # Pusher Broadcast
    render 'api/users/show'
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email, :photo_url)
  end
end
