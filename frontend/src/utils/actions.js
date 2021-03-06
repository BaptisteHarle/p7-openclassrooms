import axios from 'axios';
import jwtDecode from 'jwt-decode';
import config from '../config';
import Store from '../store';

const actions = {
  async fetchUserInfos() {
    const jwt = localStorage.getItem('jwt');
    const user = jwtDecode(jwt);
    return user;
  },
  async getPosts() {
    const url = config.api.endpoint + config.api.routes.post;
    const jwt = localStorage.getItem('jwt');
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const posts = response.data.data.posts;

    const action = {
      type: 'UPDATE_APP',
      value: { posts },
    };

    Store.dispatch(action);
    return posts;
  },
  async getUsers() {
    const url = config.api.endpoint + config.api.routes.users;
    const jwt = localStorage.getItem('jwt');
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const { users } = response.data.data;

    const action = {
      type: 'UPDATE_APP',
      value: { users },
    };

    Store.dispatch(action);
    return users;
  },
  async deleteUser(id) {
    const url = `${config.api.endpoint}${config.api.routes.user}/${id}`;
    const jwt = localStorage.getItem('jwt');

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const users = await actions.getUsers();

    return users;
  },
  checkSession() {
    const jwt = localStorage.getItem('jwt');
    return jwt ? true : false;
  }
};

export default actions;