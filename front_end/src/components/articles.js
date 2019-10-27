import {
  useState, useEffect, Fragment,
  createElement,
} from 'react';

import { getArticles } from '../services/data_services';


const Articles = () => {
  const [articles, onArticlesRequest] = useState('');

  useEffect(() => {
    getArticles().then((data) => onArticlesRequest(
      data.map(
        (article, key) => createElement(
          'article', { key },
          createElement(
            'h2', null, article.title,
          ),
          createElement(
            'p', null, article.content,
          ),
        ),
      ),
    ));
  }, [articles]);

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
