import React, { useEffect, useState } from 'react';
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

import useVisible from '../../hook/useVisible';
import { ReactComponent as EmojiIcon } from '../../assets/icons/emojiIcon.svg';
import './emoji.scss';


interface Props {
  onSelect: (emoji: string) => void
}

const Emoji: React.FC<Props> = ({ onSelect }): React.ReactElement => {
  const { ref, isVisible, setIsVisible } = useVisible(false);
  const mediaMatch = window.matchMedia('(max-width: 420px)');
  const [isSmallScreen, setIsSmallScreen] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e: any) => setIsSmallScreen(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });
  
  const toggleIsShow = () => {
    setIsVisible(!isVisible);
  };

  const onSelectHandle = (emoji: any) => {
    onSelect(emoji.native);
  };

  return (
    <div className='emoji__container'>
      {isVisible &&
        <div className='picker__container' ref={ref}>
          <Picker set='apple'
            onSelect={onSelectHandle}
            theme='dark'
            perLine={isSmallScreen ? 4 : 6}
            style={
              {
                position: "absolute",
                bottom: '50px',
                right: isSmallScreen ? '-100px' : '0',
              }
            } 
            />
        </div>

      }
      <button className='emoji__btn' onClick={toggleIsShow}>
        <EmojiIcon width='25px' />
      </button>
    </div>
  );
};

export default Emoji;