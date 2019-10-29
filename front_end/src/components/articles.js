import {
  useState, useEffect, Fragment,
  createElement,
} from 'react';

import { getArticles } from '../services/data_services';


const Articles = () => {
  const [articles, onArticlesRequest] = useState(null);

  useEffect(() => {
    getArticles().then((data) => onArticlesRequest(
      data.map(
        ({ title, content }) => createElement(
          'article', { key: title },
          createElement('h2', null, title),
          createElement('p', null, content),
        ),
      ),
    ));
  }, []);

  return createElement(
    'section', null,
    createElement(
      'h1', null, 'Blog',
    ),
    createElement(
      Fragment, null, articles,
    ),
  );
};

export default Articles;
