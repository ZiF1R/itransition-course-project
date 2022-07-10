import axios from 'axios';
import { baseUsersUrl as baseUrl } from "../constants/routes";

axios.defaults.headers.common = {
  "Content-Type": "application/json",
};

const createUser = async (data) => {
  const request = axios.post(baseUrl, data);
  return await request;
};

const login = async (email, password) => {
  const request = axios.get(baseUrl + `?email=${email}&password=${password}`);
  return await request;
}

const getUserLikes = async (id) => {
  const request = axios.get(baseUrl + `/${id}/likes`);
  return await request;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  createUser,
  getUserLikes
};
