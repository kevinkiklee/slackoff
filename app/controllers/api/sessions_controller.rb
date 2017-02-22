class Api::SessionsController < ApplicationController
	def create
		@user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user
			@channels = @user.channels.where(private: false).order(:name)
			@direct_messages = @user.channels.includes(:users).where(private: true).order(:name)

			login(@user)
			render "api/users/show"
		else
			render(
        json: ["Invalid Login"],
        status: 401
      )
		end
	end

	def destroy
		@user = current_user
		if @user
			logout
			render "api/users/show"
		else
			render(
        json: ["Not Signed In"],
        status: 404
      )
		end
	end
end
