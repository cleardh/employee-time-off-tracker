import axios from 'axios';
import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  GET_CATEGORY,
  GET_CATEGORIES,
  CLEAR_CATEGORY,
  CATEGORY_ERROR,
} from './types';
import { tokenConfig } from './auth';
import { setAlert } from './alert';

const PROXY = process.env.NODE_ENV === 'production' ? 'http://employee-time-off-tracker.herokuapp.com' : 'http://localhost:5000';

export const addCategory = (formData) => (dispatch, getState) => {
  axios
    .post(`${PROXY}/api/category`, formData, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_CATEGORY,
        payload: res.data,
      });
      dispatch(setAlert('Category added successfully', 'success'));
    })
    .catch((err) =>
      dispatch({
        type: CATEGORY_ERROR,
        payload: { msg: err.message },
      })
    );
};

export const deleteCategory = (id) => (dispatch, getState) => {
  axios
    .delete(`${PROXY}/api/category/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: DELETE_CATEGORY, payload: res.data });
      dispatch(setAlert('Category deleted successfully', 'success'));
    })
    .catch((err) =>
      dispatch({
        type: CATEGORY_ERROR,
        payload: { msg: err.message },
      })
    );
};

export const updateCategory = (id, newCategory) => (dispatch, getState) => {
  axios
    .put(
      `${PROXY}/api/category/${id}`,
      newCategory,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({ type: UPDATE_CATEGORY, payload: res.data });
      dispatch(setAlert('Category updated successfully', 'success'));
    })
    .catch((err) =>
      dispatch({
        type: CATEGORY_ERROR,
        payload: { msg: err.message },
      })
    );
};

export const getAllCategories = () => (dispatch, getState) => {
  axios
    .get(`${PROXY}/api/category`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: CATEGORY_ERROR,
        payload: { msg: err.message },
      })
    );
};

export const getCategoryByTitle = (title) => (dispatch, getState) => {
  dispatch({ type: CLEAR_CATEGORY });

  axios
    .get(
      `${PROXY}/api/category/title/${title}`,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: GET_CATEGORY,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: CATEGORY_ERROR,
        payload: { msg: err.message },
      })
    );
};
