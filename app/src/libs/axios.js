import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

axios.defaults.auth = {
    username: 'laser-queue-consumer',
    password: 'v5u#D{b0u%mrTUi',
};
