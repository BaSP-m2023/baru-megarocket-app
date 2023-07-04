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
  deleteTrainerError
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
      } else {
        dispatch(getTrainersError(message));
        dispatch(handleDisplayToast(true));
        dispatch(setContentToast({ message, state: 'fail' }));
      }
    } catch (error) {
      dispatch(getTrainersError(error));
      dispatch(handleDisplayToast(true));
      dispatch(setContentToast({ message: error.message, state: 'fail' }));
    }
  };
};

export const addTrainer = (trainer, history) => {
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
        history.push('/user/admin/trainers');
        dispatch(addTrainerSuccess(data));
        dispatch(handleDisplayToast(true));
        dispatch(setContentToast({ message, state: 'success' }));
      } else {
        dispatch(addTrainerError(message));
        dispatch(handleDisplayToast(true));
        dispatch(setContentToast({ message, state: 'fail' }));
      }
    } catch (error) {
      dispatch(addTrainerError(error));
      dispatch(handleDisplayToast(true));
      dispatch(setContentToast({ message: error.message, state: 'fail' }));
    }
  };
};

export const updTrainer = (id, updatedTrainer, history) => {
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
        history.push('/user/admin/trainers');
        dispatch(editTrainerSuccess(data));
        dispatch(handleDisplayToast(true));
        dispatch(setContentToast({ message, state: 'success' }));
      } else {
        dispatch(editTrainerError(message));
        dispatch(handleDisplayToast(true));
        dispatch(setContentToast({ message, state: 'fail' }));
      }
    } catch (error) {
      dispatch(editTrainerError(error));
      dispatch(handleDisplayToast(true));
      dispatch(setContentToast({ message: error.message, state: 'fail' }));
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
        dispatch(handleDisplayToast(true));
        dispatch(setContentToast({ message, state: 'success' }));
        dispatch(getTrainers());
      } else {
        dispatch(deleteTrainerError(message));
        dispatch(handleDisplayToast(true));
        dispatch(setContentToast({ message, state: 'fail' }));
      }
    } catch (error) {
      dispatch(deleteTrainerError(error));
      dispatch(handleDisplayToast(true));
      dispatch(setContentToast({ message: error.message, state: 'fail' }));
    }
  };
};
