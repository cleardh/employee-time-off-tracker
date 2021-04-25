import axios from 'axios';
import {
  ADD_LEVEL,
  DELETE_LEVEL,
  GET_LEVEL,
  GET_LEVELS,
  CLEAR_LEVEL,
  LEVEL_ERROR,
} from './types';
import { tokenConfig } from './auth';
import { setAlert } from './alert';

const PROXY = process.env.NODE_ENV === 'production' ? 'http://employee-time-off-tracker.herokuapp.com' : 'http://localhost:5000';

export const addLevel = (formData) => (dispatch, getState) => {
  axios
    .post(`${PROXY}/api/level`, formData, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_LEVEL,
        payload: res.data,
      });
      dispatch(setAlert('Level added successfully', 'success'));
    })
    .catch((err) =>
      dispatch({
        type: LEVEL_ERROR,
        payload: { msg: err.message },
      })
    );
};

export const deleteLevel = (id) => (dispatch, getState) => {
  axios
    .delete(`${PROXY}/api/level/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: DELETE_LEVEL, payload: res.data });
      dispatch(setAlert('Level deleted successfully', 'success'));
    })
    .catch((err) =>
      dispatch({
        type: LEVEL_ERROR,
        payload: { msg: err.message },
      })
    );
};

export const getAllLevels = () => (dispatch, getState) => {
  axios
    .get(`${PROXY}/api/level`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: GET_LEVELS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: LEVEL_ERROR,
        payload: { msg: err.message },
      })
    );
};

export const getLevelByTitle = (title) => (dispatch, getState) => {
  dispatch({ type: CLEAR_LEVEL });

  axios
    .get(
      `${PROXY}/api/level/title/${title}`,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: GET_LEVEL,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: LEVEL_ERROR,
        payload: { msg: err.message },
      })
    );
};
