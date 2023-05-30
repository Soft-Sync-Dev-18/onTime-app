import {automotive, hobbies, home, landScapping} from '../assets';
import * as Actions from './action-types';

const INITIAL_STATE = {
  userInfo: {},
  postInfo: {},
  order: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case Actions.SET_POST_INFO:
      return {
        ...state,
        postInfo: action.payload,
      };
    case Actions.SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    default:
      return state;
  }
};
