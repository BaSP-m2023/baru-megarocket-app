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
} from './actions';
import { handleDisplayToast, setContentToast } from '../Shared/ResponseToast/actions';

export const getTrainers = async (dispatch) => {
  dispatch(getTrainersPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`);
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

export const addTrainer = (trainer, history) => {
  return async (dispatch) => {
    dispatch(addTrainerPending());

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(trainer)
      });

      const { data, message, error } = await response.json();
      if (!error) {
        history.push('/trainers');
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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTrainer)
      });
      const { data, message, error } = await response.json();
      if (!error) {
        history.push('/trainers');
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
        method: 'DELETE'
      });
      const { data, message, error } = await response.json();
      if (!error) {
        dispatch(deleteTrainerSuccess(data));
        dispatch(handleDisplayToast(true));
        dispatch(setContentToast({ message, state: 'success' }));
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
