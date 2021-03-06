import axios from 'axios';
import {
  ADD_REQUEST,
  DELETE_REQUEST,
  GET_REQUEST,
  GET_REQUESTS,
  CLEAR_REQUEST,
  REQUEST_ERROR,
} from './types';
import { tokenConfig } from './auth';
import { setAlert } from './alert';

const PROXY = process.env.NODE_ENV === 'production' ? 'http://employee-time-off-tracker.herokuapp.com' : 'http://localhost:5000';

export const addRequest = (formData, calendarId) => (dispatch, getState) => {
  console.log(formData, calendarId);

  axios
    .post(`${PROXY}/api/request`, formData, tokenConfig(getState))
    .then((res) =>
      axios
        .post(
          `${PROXY}/api/calendar`,
          {
            calendarId: calendarId,
            requestId: res.data._id,
          },
          tokenConfig(getState)
        )
        .then((res) => {
          dispatch(setAlert('Request placed successfully', 'success'));
          dispatch({
            type: ADD_REQUEST,
            payload: res.data,
          });
        })
        .catch((err) =>
          dispatch({
            type: REQUEST_ERROR,
            payload: { msg: err.message },
          })
        )
    )
    .catch((err) => {
      dispatch(setAlert('Invalid request', 'danger'));
      dispatch({
        type: REQUEST_ERROR,
        payload: { msg: err.message },
      });
    });
};

export const deleteRequest = (request) => (dispatch, getState) => {
  axios
    .delete(
      `${PROXY}/api/request/${request._id}`,
      tokenConfig(getState)
    )
    .then((res) => {
      axios
        .delete(
          `${PROXY}/api/calendar/${request.user.calendarId}/${res.data.googleEventId}`,
          tokenConfig(getState)
        )
        .then((res) => {
          dispatch({ type: DELETE_REQUEST, payload: request });
          dispatch(setAlert('Request removed', 'success'));
        })
        .catch((err) =>
          dispatch({
            type: REQUEST_ERROR,
            payload: { msg: err.message },
          })
        );
    })
    .catch((err) =>
      dispatch({
        type: REQUEST_ERROR,
        payload: { msg: err.message },
      })
    );
};

export const generateReport = (dateRange) => (dispatch, getState) => {
  axios
    .post(
      `${PROXY}/api/request/report`,
      dateRange,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch(
        setAlert(`${res.data.file} has been generated successfully`, 'success')
      )
    )
    .catch((err) =>
      dispatch({
        type: REQUEST_ERROR,
        payload: { msg: err.message },
      })
    );
};

export const getAllRequests = () => (dispatch, getState) => {
  axios
    .get(`${PROXY}/api/request`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: GET_REQUESTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: REQUEST_ERROR,
        payload: { msg: err.message },
      })
    );
};

export const getRequestsByOrg = (orgId) => (dispatch, getState) => {
  axios
    .get(
      `${PROXY}/api/request/org/${orgId}`,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: GET_REQUESTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: REQUEST_ERROR,
        payload: { msg: err.message },
      })
    );
};

export const getRequestsByEmployee = (employeeId) => (dispatch, getState) => {
  axios
    .get(
      `${PROXY}/api/request/${employeeId}`,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: GET_REQUESTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: REQUEST_ERROR,
        payload: { msg: err.message },
      })
    );
};

export const getConfirmedRequestsByEmployee = (employeeId) => (
  dispatch,
  getState
) => {
  axios
    .get(
      `${PROXY}/api/request/confirmed/${employeeId}`,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: GET_REQUESTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: REQUEST_ERROR,
        payload: { msg: err.message },
      })
    );
};

export const getConfirmedRequestsByEmployeeCategory = (
  employeeId,
  categoryId
) => (dispatch, getState) => {
  axios
    .get(
      `${PROXY}/api/request/confirmed/${employeeId}/${categoryId}`,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: GET_REQUESTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: REQUEST_ERROR,
        payload: { msg: err.message },
      })
    );
};

export const confirmRequest = (request) => (dispatch, getState) => {
  dispatch({ type: CLEAR_REQUEST });

  axios
    .put(
      `${PROXY}/api/request/${request._id}`,
      null,
      tokenConfig(getState)
    )
    .then((res) => {
      // Delete event from google calendar
      axios
        .delete(
          `${PROXY}/api/calendar/${request.user.calendarId}/${res.data.googleEventId}`,
          tokenConfig(getState)
        )
        .catch((err) =>
          dispatch({
            type: REQUEST_ERROR,
            payload: { msg: err.message },
          })
        );
      // Add event to google calendar
      axios
        .post(
          `${PROXY}/api/calendar`,
          {
            calendarId: request.user.calendarId,
            requestId: request._id,
          },
          tokenConfig(getState)
        )
        .then((res) => dispatch(setAlert('Request confirmed', 'success')))
        .catch((err) =>
          dispatch({
            type: REQUEST_ERROR,
            payload: { msg: err.message },
          })
        );

      dispatch({
        type: GET_REQUEST,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: REQUEST_ERROR,
        payload: { msg: err.message },
      })
    );
};
