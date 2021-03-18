import { instance } from './api';

export const userApi = {
  signup(name: string, email: string, password: string) {
    return instance.post('/signup', { name, email, password });
  },
  login(email: string, password: string) {
    return instance.post('/login', { email, password });
  },
};