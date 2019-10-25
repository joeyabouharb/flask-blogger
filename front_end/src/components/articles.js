import {
  useState, useEffect, Fragment,
  createElement,
} from 'react';

import { getArticles } from '../services/data_services';


const Articles = () => {
  const [articles, onArticlesRequest] = useState('');

  useEffect(() => {
    getArticles().then((data) => (onArticlesRequest(data)));
  }, [articles]);

  return createElement(
    'section', null,
    createElement('h1', null, 'Blog'),
    createElement(Fragment, null, articles),
  );
};

export default Articles;
