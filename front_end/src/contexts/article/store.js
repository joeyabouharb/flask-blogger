import React, {
  createElement,
  useReducer,
  useContext,
} from 'react';

import PropTypes from 'prop-types';
import { articleReducer } from './reducers';

const articleContext = React.createContext()

const articleDispatchContext = React.createContext()

const initialState = { result: null, pageNo: 0 }

export const ArticlesProvider = ({ children }) => {
  const [articleState, articleDispatcher] = useReducer(articleReducer, initialState);
  return createElement(
    articleContext.Provider,
    { value: articleState },
    createElement(
      articleDispatchContext.Provider,
      { value: articleDispatcher },
      children,
    ),
  );
};

export const useArticleContext = () => useContext(articleContext)

export const useArticleDispatch = () => useContext(articleDispatchContext)


