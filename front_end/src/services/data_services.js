/*
* data services
*/

const URL = 'http://127.0.0.1:5000/api/v1';

export const getArticles = (currentPage) => fetch(
  `${URL}/posts?page=${currentPage}`,
).then((res) => res.json()).catch((err) => {
  throw err;
});

export const postArticle = ({ access_token, ...body }) => fetch(
  `${URL}/posts/`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      ...body,
      access_token,
    }),
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
