import { instance } from './api';
import { Message } from '../redux/reducers/chat-reducer';

export const chatApi = {
  getMessages(path: string) {
    return instance.get(path);
  },
  addMessage(path: string, message: Message) {
    return instance.post(path,
      { authorId: message.authorId, authorName: message.authorName, value: message.value });
  },
  deleteMessage(id: string) {
    return instance.delete(`/messages/${id}`);
  },
};