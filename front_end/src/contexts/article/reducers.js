import types from "./types";
import { getArticles } from '../../services/data_services';

export const articleReducer = (state, { type, payload }) => {
  if (type === types.REQUEST_ARTICLES) {
    return { ...state, ...payload };
  }
}