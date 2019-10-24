/*
* data services
*/
import { createElement as el } from 'react';

export const getArticles = () => fetch(
  'http://127.0.0.1:5000/blog',
).then((res) => res.json()).then(
  (data) => data.map(
    (article, index) => el('article', { key: index },
      el('h2', null, article.title),
      el('p', null, article.content)),
  ),
);

export const postArticle = () => {

};
