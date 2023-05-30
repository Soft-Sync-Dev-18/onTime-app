import {SET_USER_INFO, SET_POST_INFO, SET_ORDER} from './action-types';

const setUserInformation = payload => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_USER_INFO,
      payload,
    });
  };
};
const setPostInformation = payload => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_POST_INFO,
      payload,
    });
  };
};
const setOrderInformation = payload => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_ORDER,
      payload,
    });
  };
};

export const ACTIONS = {
  setUserInformation,
  setPostInformation,
  setOrderInformation,
};
