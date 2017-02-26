class StaticPagesController < ApplicationController
  def root
    if logged_in?
      @channels = current_user.channels.where(private: false).order(:name)
      @direct_messages = current_user.channels.includes(:users).where(private: true).order(:name)
    end

    og_image_url = root_url + ActionController::Base.helpers.asset_url("slackoff-og.jpg")

    set_meta_tags og: {
      title:    'SlackOff',
      url:      'http://slackoff.today',
      image:    og_image_url,
      description: 'SlackOff is a full-stack web application inspired by Slack. It utilizes Ruby on Rails, React.js with Redux pattern, and Pusher API for websocket protocol.'
    }
  end
end
