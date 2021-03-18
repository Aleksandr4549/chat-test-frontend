import React from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { login, signup } from '../../redux/reducers/auth-reducer';
import LoginForm from './LoginForm/LoginForm';
import SignupForm from './SignupForm/SignupForm';
import { StateType } from '../../redux/store';

interface MapStateProps {
  isAuth: boolean
  loginErrors: Array<string | undefined>
  signupErrors: Array<string | undefined>
  isFetching: boolean
}

interface MapDispatchProps {
  login: (email: string, password: string) => void
  signup: (name: string, email: string, password: string) => void
}

type Props = MapStateProps & MapDispatchProps;

const AuthContainer: React.FC<Props> = ({ isAuth, login, signup, loginErrors, signupErrors, isFetching }): React.ReactElement => {
  const { pathname } = useLocation();

  if (isAuth) return <Redirect to='/work' />

  return (
    <>
      {pathname === '/login' &&
        <LoginForm loginSubmit={login} authErrors={loginErrors} isDisabled={isFetching} />}

      {pathname === '/signup' &&
        <SignupForm signupSubmit={signup} authErrors={signupErrors} isDisabled={isFetching} />}
    </>
  );
};

const mapStateToProps = (state: StateType): MapStateProps => ({
  isAuth: state.auth.isAuth,
  loginErrors: state.auth.loginErrors,
  signupErrors: state.auth.signupErrors,
  isFetching: state.auth.isFetching,
});

export default connect(mapStateToProps, { login, signup })(AuthContainer);