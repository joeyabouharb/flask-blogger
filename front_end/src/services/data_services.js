/*
* data services
*/

const URL = 'http://127.0.0.1:5000/api/v1';

export const getArticles = () => fetch(
  `${URL}/posts`,
).then((res) => res.json()).catch((err) => {
  throw err;
});

export const postArticle = (data) => fetch(
  `${URL}/posts`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  },
);


export const loginRequest = (data) => fetch(
  `${URL}/login`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  },
).then((response) => {
  if (response.status === 200) {
    return response.json();
  }
  throw new Error('Incorrect credentials');
}).catch((error) => {
  throw error;
});


export const registerRequest = (data) => fetch(
  `${URL}/register`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  },
);
