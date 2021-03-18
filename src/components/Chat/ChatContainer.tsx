import React, { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import { StateType } from '../../redux/store';
import { Message, Messages, getMessages, addMessage, deleteMessage } from '../../redux/reducers/chat-reducer';
import Chat from './Chat';

interface MapStateProps {
  workMessages: Messages
  floodMessages: Messages
  meId: string
  meName: string
}

interface MapDispatchProps {
  getMessages: (path: string) => void
  addMessage: (path: string, message: Message) => void
  deleteMessage: (id: string) => void
}

type Props = MapStateProps & MapDispatchProps

const ChatBodyContainer: React.FC<Props> = ({ workMessages, floodMessages, getMessages, 
  addMessage, deleteMessage, meId, meName }): React.ReactElement => {
  const { pathname } = useLocation();

  const memoizedGetMessages = useCallback(() => {
      getMessages(pathname);
    }, [pathname, getMessages],)

  useEffect(() => {
    memoizedGetMessages()
  }, [pathname, memoizedGetMessages]);

  const memoizedAddMessage = useCallback((value: string) => {
    addMessage(pathname, { authorId: meId as string, authorName: meName as string, value });
  }, [pathname, addMessage, meId, meName]);

  return (
      <Chat messages={pathname === '/work' ? workMessages : floodMessages} 
            userId={meId} 
            addMessage={memoizedAddMessage} 
            deleteMessage={deleteMessage}  />
  );
};

const mapStateToProps = (state: StateType): MapStateProps => ({
  workMessages: state.chat.workMessages,
  floodMessages: state.chat.floodMessages,
  meId: state.auth.id as string,
  meName: state.auth.name as string,
});

export default connect(mapStateToProps, { getMessages, addMessage, deleteMessage })(ChatBodyContainer);