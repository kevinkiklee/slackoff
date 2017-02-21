class Api::UsersController < ApplicationController
  def index
  end

  def show
    @user = User.includes(:channels).find(params[:id])
    @channels = @user.channels
    render "api/users/show"
  end

  def create
    @user = User.new(user_params)
    @user.current_channel = Channel.find_by(name: 'general').id

    if @user.save
      @user.subscriptions.create(channel_id: @user.current_channel)
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email, :photo_url)
  end
end
