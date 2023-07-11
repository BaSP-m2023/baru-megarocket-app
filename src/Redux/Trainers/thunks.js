import {
  getTrainersPending,
  getTrainersSuccess,
  getTrainersError,
  addTrainerPending,
  addTrainerSuccess,
  addTrainerError,
  editTrainerPending,
  editTrainerSuccess,
  editTrainerError,
  deleteTrainerPending,
  deleteTrainerSuccess,
  deleteTrainerError,
  setRedirect
} from 'Redux/Trainers/actions';

import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';

const token = sessionStorage.getItem('token');

export const getTrainers = () => {
  return async (dispatch) => {
    dispatch(getTrainersPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token
        }
      });
      const { data, message, error } = await response.json();
      if (!error) {
        dispatch(getTrainersSuccess(data));
        return data;
      } else {
        dispatch(getTrainersError(message));
        dispatch(setContentToast({ message, state: 'fail' }));
        dispatch(handleDisplayToast(true));
      }
    } catch (error) {
      dispatch(getTrainersError(error));
      dispatch(setContentToast({ message: error.message, state: 'fail' }));
      dispatch(handleDisplayToast(true));
    }
  };
};

export const addTrainer = (trainer) => {
  return async (dispatch) => {
    dispatch(addTrainerPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify(trainer)
      });

      const { data, message, error } = await response.json();
      if (!error) {
        dispatch(addTrainerSuccess(data));
        dispatch(setContentToast({ message, state: 'success' }));
        dispatch(handleDisplayToast(true));
        dispatch(setRedirect());
      } else {
        dispatch(addTrainerError(message));
        dispatch(setContentToast({ message, state: 'fail' }));
        dispatch(handleDisplayToast(true));
      }
    } catch (error) {
      dispatch(addTrainerError(error));
      dispatch(setContentToast({ message: error.message, state: 'fail' }));
      dispatch(handleDisplayToast(true));
    }
  };
};

export const updTrainer = (id, updatedTrainer) => {
  return async (dispatch) => {
    dispatch(editTrainerPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify(updatedTrainer)
      });
      const { data, message, error } = await response.json();
      if (!error) {
        dispatch(editTrainerSuccess(data));
        dispatch(setContentToast({ message, state: 'success' }));
        dispatch(handleDisplayToast(true));
        dispatch(setRedirect());
        return data;
      } else {
        dispatch(editTrainerError(message));
        dispatch(setContentToast({ message, state: 'fail' }));
        dispatch(handleDisplayToast(true));
      }
    } catch (error) {
      dispatch(editTrainerError(error));
      dispatch(setContentToast({ message: error.message, state: 'fail' }));
      dispatch(handleDisplayToast(true));
    }
  };
};

export const deleteTrainer = (id) => {
  return async (dispatch) => {
    dispatch(deleteTrainerPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: token
        }
      });
      const { data, message, error } = await response.json();
      if (!error) {
        dispatch(deleteTrainerSuccess(data));
        dispatch(getTrainers());
        dispatch(setContentToast({ message, state: 'success' }));
        dispatch(handleDisplayToast(true));
      } else {
        dispatch(deleteTrainerError(message));
        dispatch(setContentToast({ message, state: 'fail' }));
        dispatch(handleDisplayToast(true));
      }
    } catch (error) {
      dispatch(deleteTrainerError(error));
      dispatch(setContentToast({ message: error.message, state: 'fail' }));
      dispatch(handleDisplayToast(true));
    }
  };
};
