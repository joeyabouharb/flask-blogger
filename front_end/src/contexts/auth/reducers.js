import types from './types';

const loginReducer = (state, { type, payload }) => {
  switch (type) {
    case types.USER_LOGS_IN:
      return { ...state, payload };
    case types.USER_LOGS_OUT:
      return { ...state, payload };
    default:
      return state;
  }
};

export default loginReducer;
