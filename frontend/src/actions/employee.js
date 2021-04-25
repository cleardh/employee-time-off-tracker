import axios from 'axios';
import {
  DELETE_EMPLOYEE,
  GET_EMPLOYEE,
  GET_EMPLOYEES,
  CLEAR_EMPLOYEE,
  EMPLOYEE_ERROR,
  UPDATE_EMPLOYEE,
} from './types';
import { tokenConfig } from './auth';
import { setAlert } from './alert';

const PROXY = process.env.NODE_ENV === 'production' ? 'http://employee-time-off-tracker.herokuapp.com' : 'http://localhost:5000';

export const deleteEmployee = (id) => (dispatch, getState) => {
  axios
    .delete(`${PROXY}/api/employee/${id}`, tokenConfig(getState))
    .then((res) => dispatch({ type: DELETE_EMPLOYEE, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: EMPLOYEE_ERROR,
        payload: { msg: err.message },
      })
    );
};

export const getAllEmployees = () => (dispatch, getState) => {
  dispatch({ type: CLEAR_EMPLOYEE });

  axios
    .get(`${PROXY}/api/employee`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: GET_EMPLOYEES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: EMPLOYEE_ERROR,
        payload: { msg: err.message },
      })
    );
};

export const getCurrentEmployee = () => (dispatch, getState) => {
  dispatch({ type: CLEAR_EMPLOYEE });

  axios
    .get(`${PROXY}/api/employee/me`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: GET_EMPLOYEE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: EMPLOYEE_ERROR,
        payload: { msg: err.message },
      })
    );
};

export const getEmployeeByEmail = (email) => (dispatch, getState) => {
  dispatch({ type: CLEAR_EMPLOYEE });

  axios
    .get(
      `${PROXY}/api/employee/email/${email}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_EMPLOYEE,
        payload: res.data,
      });
      if (!res.data) {
        dispatch(setAlert('Employee not found', 'danger'));
        dispatch({ type: CLEAR_EMPLOYEE });
      }
    })
    .catch((err) => {
      dispatch({
        type: EMPLOYEE_ERROR,
        payload: { msg: err.message },
      });
    });
};

export const updateEmployee = (formData, id) => (dispatch, getState) => {
  dispatch({ type: CLEAR_EMPLOYEE });

  axios
    .put(
      `${PROXY}/api/employee/${id}`,
      formData,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: UPDATE_EMPLOYEE,
      })
    )
    .catch((err) =>
      dispatch({
        type: EMPLOYEE_ERROR,
        payload: { msg: err.message },
      })
    );
};
