class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.all.includes(:messages => [:user])
    render 'api/channels/index'
  end

  def create
    @channel = Channel.find_by(name: params[:channel][:name]).includes(:messages => [:user])

    if @channel
      users = params[:channel][:users]

      Subscription.create(user_id: current_user.id, channel_id: @channel.id)

      if users
        users.each do |i|
          user_id = users[i][:id].to_i
          @sub = Subscription.find_by(user_id: user_id, channel_id: @channel.id)

          unless @sub
            Subscription.create(user_id: user_id, channel_id: @channel.id)
          end
        end
      end

      @users = @channel.users.order(:username)
      @messages = @channel.messages.order(:created_at).reverse
      @user_count = @channel.users.count

      Pusher.trigger('application', 'update', {});

      render 'api/channels/show'
      return
    end

    @channel = Channel.new(channel_params)

    users = params[:channel][:users]

    if @channel.save
      if users
        users.each do |i|
          user_id = users[i][:id].to_i
          Subscription.create(user_id: user_id, channel_id: @channel.id)
        end
      end

      @users = @channel.users.order(:username)
      @messages = @channel.messages.order(:created_at).reverse
      @user_count = @channel.users.count

      new_channel = {
        "id" => @channel.id,
        "name" => @channel.name,
        "description" => @channel.description,
        "display_name" => @channel.display_name,
        "created_at" => @channel.created_at,
        "userCount" => @user_count
      }

      Pusher.trigger('application', 'update', {});

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

  def update
    @channel = Channel.find(params[:id])
    @channel.update(channel_params)

    @users = @channel.users.order(:username)
    @messages = @channel.messages.order(:created_at).reverse
    @user_count = @channel.users.count

    Pusher.trigger('application', 'update', {});
    render 'api/channels/show'
  end

  def destroy
    @channel = Channel.find(params[:id])
    @channel.destroy

    @users = @channel.users.order(:username)
    @messages = @channel.messages.order(:created_at).reverse
    @user_count = @channel.users.count

    Pusher.trigger('application', 'update', {});
    render 'api/channels/show'
  end

  def channel_params
    params.require(:channel).permit(:name, :display_name, :description, :private)
  end
end
