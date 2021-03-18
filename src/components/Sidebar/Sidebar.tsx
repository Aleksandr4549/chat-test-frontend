import React from 'react';
import classnames from 'classnames';

import MenuBtn from '../Buttons/MenuBtn/MenuBtn';
import DefaultBtn from '../Buttons/DefaultBtn/DefaultBtn';
import { ReactComponent as Arrow } from '../../assets/icons/arrowRightIcon.svg';
import './sidebar.scss';

interface Props {
  isOpen: boolean

  logout: () => void
  toggleIsOpen: () => void
}

const Sidebar: React.FC<Props> = ({ logout, isOpen, toggleIsOpen }): React.ReactElement => {
  return (
    <div className={classnames({'sidebar__container': true, 'sidebar__container__open': isOpen})}>
      <div>
        <ul className='sidebar__list'>
          <li className='sidebar__list_item'><MenuBtn linkUrl='/work' text='рабочий чат' /></li>
          <li className='sidebar__list_item'><MenuBtn linkUrl='/flood' text='болталка' /></li>
        </ul>
      </div>
      <div className='sidebar__icon' onClick={toggleIsOpen}>
        <Arrow width='30px' />
      </div>
      <div className='sidebar__btn'>
        <DefaultBtn value='Logout' onClickHandle={logout} isDisabled={false} />
      </div>
    </div>
  );
};

export default Sidebar;