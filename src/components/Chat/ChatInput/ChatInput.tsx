import React, { useState } from 'react';

import DefaultBtn from '../../Buttons/DefaultBtn/DefaultBtn';
import Emoji from '../../Emoji/Emoji';
import './chatInput.scss';

interface Props {
  addMessage: (value: string) => void

}

const ChatInput: React.FC<Props> = ({ addMessage }): React.ReactElement => {
  const [state, setState] = useState<string>('');

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setState(e.currentTarget.value);
  };

  const onClickHandle = () => {
    addMessage(state.trim());
    setState('');
  };

  const onSelectEmoji = (emoji: string) => {
    setState(state => `${state} ${emoji}`)
  };

  return (
    <div className='chat__input__container'>
      <div className='chat__input__block'>
        <input className='chat__input'
          type="text"
          value={state}
          onChange={onChange}
          placeholder='введите текст сообщения' />
        <div className='chat__emoji'>
          <Emoji onSelect={onSelectEmoji} />
        </div>
      </div>


      <DefaultBtn value='отправить' onClickHandle={onClickHandle} isDisabled={state.trim() ? false : true} />
    </div>
  );
};

export default ChatInput;