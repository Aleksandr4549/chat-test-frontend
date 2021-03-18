import React from 'react';

import Message from '../Message/Message';
import ChatInput from './ChatInput/ChatInput';
import { Messages } from '../../redux/reducers/chat-reducer';
import './chat.scss';

interface Props {
  messages: Messages
  userId: string
  addMessage: (value: string) => void
  deleteMessage: (id: string) => void
}

const Chat: React.FC<Props> = React.memo(({ messages, addMessage, userId, deleteMessage }): React.ReactElement => {
  return (
    <div className='chat__container'>
      <div>
        {messages.length > 0 &&  messages.map(message => <Message key={message._id}
                                          _id={message._id as string}
                                          authorId={message.authorId}
                                          authorName={message.authorName}
                                          value={message.value}
                                          isOwn={userId === message.authorId}
                                          deleteMessage={deleteMessage} />)}
      </div>

      <div className='chat__input__wrapper'>
        <ChatInput addMessage={addMessage} />
      </div>
    </div>
  );
});

export default Chat;