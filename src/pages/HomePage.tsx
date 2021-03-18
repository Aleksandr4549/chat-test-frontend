import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { StateType } from '../redux/store';
import SidebarContainer from '../components/Sidebar/SidebarContainer';
import ChatContainer from '../components/Chat/ChatContainer';
import './home.scss';

interface MapStateProps {
  isAuth: boolean
}
const Home: React.FC<MapStateProps> = ({ isAuth }): React.ReactElement => {
  if (!isAuth) return <Redirect to='/login' />

  return (
    <div className='home__container'>
      <SidebarContainer />
      <ChatContainer />
    </div>
  );
};

const mapStateToProps = (state: StateType): MapStateProps => ({ isAuth: state.auth.isAuth });

export default connect(mapStateToProps, {})(Home);