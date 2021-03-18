import React from 'react';
import { NavLink } from 'react-router-dom';

import './menuBtn.scss';

interface Props {
  linkUrl: string
  text: string
}

const MenuBtn: React.FC<Props> = ({linkUrl, text}): React.ReactElement => {
  return (
    <NavLink className='menu__btn' activeClassName='menu__btn-active' to={linkUrl}>{text}</NavLink>
  );
};

export default MenuBtn;