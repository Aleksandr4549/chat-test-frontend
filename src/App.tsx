import React, { useEffect, useCallback } from 'react';
import { Route, useLocation, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { initializeApp } from './redux/reducers/initialize-reducer';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import './App.css';

interface MapDispatchProps {
  initializeApp: () => void
}

type Props = MapDispatchProps

const App: React.FC<Props> = ({ initializeApp }): React.ReactElement => {
  const { pathname } = useLocation();

  const memoizedInitializeApp = useCallback(() => {
    initializeApp()
  }, [initializeApp]);

  useEffect(() => {
    memoizedInitializeApp();
  }, [memoizedInitializeApp]);

  if (pathname === '/') return <Redirect to='/work' />

  return (
    <div className='app'>
      <Route path={['/work', '/flood']} render={() => <HomePage />} />
      <Route path={['/login', '/signup']} render={() => <AuthPage />} />
    </div>
  );
}

export default connect(null, { initializeApp })(App);