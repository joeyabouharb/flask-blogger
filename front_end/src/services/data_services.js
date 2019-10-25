/*
* data services
*/
import { createElement as el } from 'react';

const URL = 'http://127.0.0.1:5000';

export const getArticles = () => fetch(
  `${URL}/blog`,
).then((res) => res.json()).then(
  (data) => data.map(
    (article, index) => el('article', { key: index },
      el('h2', null, article.title),
      el('p', null, article.content)),
  ),
).catch((err) => {
  throw err;
});

export const postArticle = () => {

};
