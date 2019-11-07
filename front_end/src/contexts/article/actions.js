import types from './types';

export const requestArticles = (payload) => ({
  type: types.REQUEST_ARTICLES, payload: payload
})