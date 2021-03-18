import React from 'react';

import { Message as IMessage} from '../../redux/reducers/chat-reducer';
import './message.scss';

interface CallbackProps {
  deleteMessage: (id: string) => void
}

interface Props extends IMessage {
  _id: string
  isOwn: boolean
}

const Message: React.FC<Props & CallbackProps> = ({ _id, authorName, value, 
                                                    isOwn, deleteMessage }): React.ReactElement => {
  const onClickHandler = () => {
    deleteMessage(_id);
  };

  return (
    <div className={isOwn ? 'message__container_own' : 'message__container'}>
      <div className='message__text'>{value}</div>
      <div className='message__info'>
        {isOwn && <button onClick={onClickHandler}>удалить</button>}
        <span>{authorName}</span>
      </div>
    </div>
  );
};

export default Message;