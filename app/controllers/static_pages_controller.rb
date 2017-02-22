class StaticPagesController < ApplicationController
  def root
    if logged_in?
      @channels = current_user.channels.where(private: false).order(:name)
      @direct_messages = current_user.channels.includes(:users).where(private: true).order(:name)
    end
  end
end
