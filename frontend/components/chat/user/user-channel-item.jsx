import React from 'react';

const UserChannelItem = (props) => {
  let itemClass = 'user-channels-item';

  if (props.currentChannel.id == props.channel.id)
    itemClass = itemClass + ' selected-channel';

    return (
      <li className={ itemClass }>
        <span className='channel-tag'># </span>
        { props.channel.name }
      </li>
    );
};

export default UserChannelItem;
