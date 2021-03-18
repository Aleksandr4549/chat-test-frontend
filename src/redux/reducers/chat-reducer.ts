import { ThunkType } from '../store';
import { chatApi } from '../../api/chat-api';

const SET_WORK_MESSAGES = 'SET_WORK_MESSAGES';
const SET_FLOOD_MESSAGES = 'SET_FLOOD_MESSAGES';

export interface Message {
  _id?: string
  authorId: string
  authorName: string
  value: string
}

export type Messages = Array<Message>

interface InitialState {
  workMessages: Messages
  floodMessages: Messages
}

const initialState: InitialState = {
  workMessages: [] as Messages,
  floodMessages: [] as Messages,
}

interface SetMessages {
  type: typeof SET_WORK_MESSAGES | typeof SET_FLOOD_MESSAGES
  payload: Messages
}

type Actions = SetMessages

const chatReducer = (state = initialState, action: Actions): InitialState => {
  switch (action.type) {
    case SET_WORK_MESSAGES:
      return { ...state, workMessages: action.payload };
    case SET_FLOOD_MESSAGES:
      return { ...state, floodMessages: action.payload };
    default:
      return state;
  }
};

const setWorkMessages = (messages: Messages): SetMessages => ({ type: SET_WORK_MESSAGES, payload: messages });
const setFloodMessages = (messages: Messages): SetMessages => ({ type: SET_FLOOD_MESSAGES, payload: messages });

export const getMessages = (path: string): ThunkType => {
  return async (dispatch) => {
    const { data } = await chatApi.getMessages(path);

    if (data.data) {
      if (path === '/work') {
        dispatch(setWorkMessages(data.data));
      }

      if (path === '/flood') {
        dispatch(setFloodMessages(data.data));
      }
    }
  }
};

export const addMessage = (path: string, message: Message): ThunkType => {
  return async (dispatch) => {
    const { data } = await chatApi.addMessage(path, message);

    if (data.data) {
      dispatch(getMessages(path));
    }
  }
};

export const deleteMessage = (id: string): ThunkType => {
  return async (dispatch, getState) => {
    try {
      await chatApi.deleteMessage(id);
      const chatState = getState().chat;

      for (let key in chatState) {
        if (key.length > 0) {
          if (key === 'workMessages') {
            dispatch(getMessages('/work'));
          }

          if (key === 'floodMessages') {
            dispatch(getMessages('/flood'));
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
};

export default chatReducer;