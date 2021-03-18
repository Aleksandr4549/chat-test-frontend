import React, { useState } from 'react';
import { connect } from 'react-redux';

import Sidebar from './Sidebar';
import { logout } from '../../redux/reducers/auth-reducer';

interface MapDispatchProps {
  logout: () => void
}

const SidebarContainer: React.FC<MapDispatchProps> = ({ logout }): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return <Sidebar logout={logout} isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
};

export default connect(null, { logout })(SidebarContainer);