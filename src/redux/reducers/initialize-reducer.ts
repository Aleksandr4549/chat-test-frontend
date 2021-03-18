import { ThunkType } from '../store';
import { getAuthMe } from './auth-reducer';

const SET_INITIALIZE = 'SET_INITIALIZE';

interface InitialState {
  isInitialized: boolean
}

interface SetInitialize {
  type: typeof SET_INITIALIZE
}

const initialState: InitialState = {
  isInitialized: false
}

const initializeReducer = (state = initialState, action: SetInitialize): InitialState => {
  switch (action.type) {
    case SET_INITIALIZE:
      return { ...state, isInitialized: true };
    default:
      return state;
  }
};

const setInitialize = (): SetInitialize => ({ type: SET_INITIALIZE });

export const initializeApp = (): ThunkType => {
  return async (dispatch) => {
    dispatch(getAuthMe());
    dispatch(setInitialize());
  } 
}

export default initializeReducer;