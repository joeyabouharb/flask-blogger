import {
  useState, useEffect, Fragment,
  createElement as el,
} from 'react';
import { getArticles } from '../services/data_services';


const Articles = () => {
  const [articles, onArticlesRequest] = useState('');

  useEffect(() => {
    getArticles().then((data) => (onArticlesRequest(data)));
  }, []);

  return el(
    'section', null,
    el('h1', null, 'Blog'),
    el(Fragment, null, articles),
  );
};

export default Articles;
