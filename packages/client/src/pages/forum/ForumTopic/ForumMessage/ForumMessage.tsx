import './ForumMessage.css';

import { type FC } from 'react';

import { type ForumMessageProps } from './typings';

export const ForumMessage: FC<ForumMessageProps> = ({ message }) => {
  const { id, username, content, } = message;
 
  return (
    <div id={`forum-message-${id}`} className="forum-message" data-testid="forum-message">
      <div className="forum-message__avatar">
        <img alt={`${username} user avatar`} className="forum-message__avatar-image"  />
      </div>
      <div className="forum-message__content">
        <div className="forum-message__meta">
          <span className="forum-message__username">{username}</span>
          
        </div>
        <div className="forum-message__text">{content}</div>
      </div>
      
    </div>
  );
};
