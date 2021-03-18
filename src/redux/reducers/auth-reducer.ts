import { ThunkType } from '../store';
import { userApi } from '../../api/auth-api';

const SET_AUTH_DATA = 'SET_AUTH_DATA';
const CLEAN_AUTH_DATA = 'CLEAN_AUTH_DATA';
const SET_LOGIN_ERRORS = 'SET_LOGIN_ERRORS'; 
const SET_SIGNUP_ERRORS = 'SET_SIGNUP_ERRORS'; 
const CLEAN_AUTH_ERRORS = 'CLEAN_AUTH_ERRORS';
const TOGGLE_AUTH_IS_FETCHING = 'TOGGLE_AUTH_IS_FETCHING';

interface IUser {
  id: string
  name: string
  email: string
}
type Errors = Array<string | undefined> 

interface InitialState {
  id: string | null
  name: string | null
  email: string | null
  isAuth: boolean
  loginErrors: Errors
  signupErrors: Errors
  isFetching: boolean
}

interface SetAuthMe {
  type: typeof SET_AUTH_DATA
  payload: IUser
}

interface CleanAuthData {
  type: typeof CLEAN_AUTH_DATA
}

interface SetLoginErrors {
  type: typeof SET_LOGIN_ERRORS
  payload: string
}

interface SetSignupErrors {
  type: typeof SET_SIGNUP_ERRORS
  payload: string
}

interface CleanAuthErrors {
  type: typeof CLEAN_AUTH_ERRORS
}

interface ToggleIsFetching {
  type: typeof TOGGLE_AUTH_IS_FETCHING
}

type Actions = SetAuthMe | CleanAuthData | SetLoginErrors | SetSignupErrors | CleanAuthErrors | ToggleIsFetching;

const initialState: InitialState = {
  id: null,
  name: null,
  email: null,
  isAuth: false,
  loginErrors: [],
  signupErrors: [],
  isFetching: false,
}

const authReducer = (state = initialState, action: Actions): InitialState => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        name: action.payload.name,
        isAuth: true
      };
    case CLEAN_AUTH_DATA:
      return initialState;
    case SET_LOGIN_ERRORS:
      return {...state, loginErrors: [...state.loginErrors, action.payload]};
    case SET_SIGNUP_ERRORS:
        return {...state, signupErrors: [...state.signupErrors, action.payload]};
    case CLEAN_AUTH_ERRORS: 
      return { ...state, loginErrors: [], signupErrors: [] };
    case TOGGLE_AUTH_IS_FETCHING:
      return { ...state, isFetching: !state.isFetching };
    default:
      return state;
  }
};



const setAuthMe = (data: IUser): SetAuthMe => ({ type: SET_AUTH_DATA, payload: data });
const cleanAuthMe = (): CleanAuthData => ({ type: CLEAN_AUTH_DATA });
const setLoginErrors = (error: string): SetLoginErrors => ({ type: SET_LOGIN_ERRORS, payload: error });
const setSignupErrors = (error: string): SetSignupErrors => ({ type: SET_SIGNUP_ERRORS, payload: error });
const cleanAuthErrors = (): CleanAuthErrors => ({ type: CLEAN_AUTH_ERRORS });
const toggleIsFetching = (): ToggleIsFetching => ({ type: TOGGLE_AUTH_IS_FETCHING });

export const getAuthMe = (): ThunkType => {
  return async (dispatch) => {
    //@ts-ignore
    const authData = JSON.parse(localStorage.getItem('chatUser'));
    if (authData) {
      dispatch(setAuthMe({ id: authData._id, name: authData.name, email: authData.email }));
    }
  }
};

export const login = (email: string, password: string): ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(toggleIsFetching());
      dispatch(cleanAuthErrors());
      const { data } = await userApi.login(email, password);
      localStorage.setItem('chatUser', JSON.stringify(data.data));
      dispatch(getAuthMe());
      dispatch(toggleIsFetching());
    } catch (err) {
      dispatch(setLoginErrors(err.response.data.message));
      dispatch(toggleIsFetching());
    }
  }
};

export const logout = (): ThunkType => {
  return async (dispatch) => {
    localStorage.removeItem('chatUser');
    dispatch(cleanAuthMe());
  }
};

export const signup = (name: string, email: string, password: string): ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(toggleIsFetching());
      dispatch(cleanAuthErrors());
      const { data } = await userApi.signup(name, email, password);
      localStorage.setItem('chatUser', JSON.stringify(data.data));
      dispatch(getAuthMe());
      dispatch(toggleIsFetching());
    } catch (err) {
      dispatch(setSignupErrors(err.response.data.message));
      dispatch(toggleIsFetching());
    }
  }
};

export default authReducer;