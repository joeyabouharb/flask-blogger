import React, {
  useState, useEffect,
} from 'react';

import { getArticles } from '../services/data_services';

//   (data) => data.map(
//     (article, key) => createElement('article', { key },
//       createElement('h2', null, article.title),
//       createElement('p', null, article.content)),
//   ),
// )

const Articles = () => {
  const [articles, onArticlesRequest] = useState('');

  useEffect(() => {
    getArticles().then((data) => (
      onArticlesRequest(data.map(({ title, content }) => (
        <article key={title}>
          <h2>{title}</h2>
          <p>{content}</p>
        </article>
      )))
    ));
  }, [articles]);

  return (
    <section>
      <h1> Blog </h1>
      <>
        { articles }
      </>
    </section>
  );
  // createElement(
  //   'section', null,
  //   createElement('h1', null, 'Blog'),
  //   createElement(Fragment, null, articles),
  // );
};

export default Articles;
