/*
* data services
*/
import { createElement } from 'react';

const URL = 'http://127.0.0.1:5000';

export const getArticles = () => fetch(
  `${URL}/blog_all`,
).then((res) => res.json()).then(
  (data) => data.map(
    (article, key) => createElement('article', { key },
      createElement('h2', null, article.title),
      createElement('p', null, article.content)),
  ),
).catch((err) => {
  throw err;
});

export const postArticle = (data) => {
  fetch(
    `${URL}/create_post`, {
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
};
