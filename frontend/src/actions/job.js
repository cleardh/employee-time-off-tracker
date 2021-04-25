import axios from 'axios';
import {
  ADD_JOB,
  DELETE_JOB,
  GET_JOB,
  GET_JOBS,
  CLEAR_JOB,
  JOB_ERROR,
} from './types';
import { tokenConfig } from './auth';
import { setAlert } from './alert';

const PROXY = process.env.NODE_ENV === 'production' ? 'http://employee-time-off-tracker.herokuapp.com' : 'http://localhost:5000';

export const addJob = (formData) => (dispatch, getState) => {
  axios
    .post(`${PROXY}/api/job`, formData, tokenConfig(getState))
    // .post('http://localhost:8000/job', formData)
    .then((res) => {
      dispatch({
        type: ADD_JOB,
        payload: res.data,
      });
      dispatch(setAlert('Job added successfully', 'success'));
    })
    .catch((err) =>
      dispatch({
        type: JOB_ERROR,
        payload: { msg: err.message },
      })
    );
};

export const deleteJob = (id) => (dispatch, getState) => {
  axios
    .delete(`${PROXY}/api/job/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: DELETE_JOB, payload: res.data });
      dispatch(setAlert('Job deleted successfully', 'success'));
    })
    .catch((err) =>
      dispatch({
        type: JOB_ERROR,
        payload: { msg: err.message },
      })
    );
};

export const getAllJobs = () => (dispatch, getState) => {
  axios
    .get(`${PROXY}/api/job`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: GET_JOBS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: JOB_ERROR,
        payload: { msg: err.message },
      })
    );
};

export const getJobById = (id) => (dispatch, getState) => {
  dispatch({ type: CLEAR_JOB });

  axios
    .get(`${PROXY}/api/job/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: GET_JOB,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: JOB_ERROR,
        payload: { msg: err.message },
      })
    );
};

export const getJobByTitle = (title) => (dispatch, getState) => {
  dispatch({ type: CLEAR_JOB });

  axios
    .get(`${PROXY}/api/job/title/${title}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: GET_JOB,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: JOB_ERROR,
        payload: { msg: err.message },
      })
    );
};
