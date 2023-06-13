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
import { responseModal } from '../Shared/ResponseModal/actions';

export const getTrainers = async (dispatch) => {
  dispatch(getTrainersPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`);
    const data = await response.json();
    if (response.ok) {
      dispatch(getTrainersSuccess(data.data));
    } else {
      dispatch(responseModal({ show: true, message: data.message, state: 'fail' }));
      dispatch(getTrainersError(data.message));
    }
  } catch (error) {
    dispatch(getTrainersError(error));
    dispatch(responseModal({ show: true, message: error, state: 'fail' }));
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

      const data = await response.json();
      if (response.ok) {
        dispatch(responseModal({ show: true, message: data.message, state: 'success' }));
        dispatch(addTrainerSuccess(data));
        history.push('/trainers');
      } else {
        dispatch(responseModal({ show: true, message: data.message, state: 'fail' }));
        dispatch(addTrainerError(data.message));
      }
    } catch (error) {
      dispatch(addTrainerError(error));
      dispatch(responseModal({ show: true, message: error, state: 'fail' }));
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
      const data = await response.json();
      if (response.ok) {
        dispatch(responseModal({ show: true, message: data.message, state: 'success' }));
        dispatch(editTrainerSuccess(data));
        history.push('/trainers');
      } else {
        dispatch(responseModal({ show: true, message: data.message, state: 'fail' }));
        dispatch(editTrainerError(data.message));
      }
    } catch (error) {
      dispatch(editTrainerError(error));
      dispatch(responseModal({ show: true, message: error, state: 'fail' }));
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
      const data = await response.json();
      if (response.ok) {
        dispatch(responseModal({ show: true, message: data.message, state: 'success' }));
        dispatch(deleteTrainerSuccess(id));
        getTrainers(dispatch);
      } else {
        dispatch(responseModal({ show: true, message: data.message, state: 'fail' }));
        dispatch(deleteTrainerError('Failed to delete trainer'));
      }
    } catch (error) {
      dispatch(deleteTrainerError(error));
      dispatch(responseModal({ show: true, message: error, state: 'fail' }));
    }
  };
};
