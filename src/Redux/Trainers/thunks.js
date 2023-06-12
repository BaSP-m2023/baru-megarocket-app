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
  showResponseModal
} from './actions';

export const getTrainers = async (dispatch) => {
  dispatch(getTrainersPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`);
    const data = await response.json();
    if (response.ok) {
      dispatch(getTrainersSuccess(data.data));
    } else {
      dispatch(showResponseModal(`Error fetching trainer: ${data.message}`, 'fail'));
    }
  } catch (error) {
    dispatch(getTrainersError(`Error fetching trainer: ${error.message}`));
    dispatch(showResponseModal(`Error fetching trainer: ${error.message}`, 'fail'));
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
        dispatch(addTrainerSuccess(data));
        dispatch(showResponseModal('Trainer added successfully!', 'success'));
        history.push('/trainers');
      } else {
        dispatch(addTrainerError('Failed to add trainer'));
        dispatch(showResponseModal(`Error adding trainer: ${data.message}`, 'fail'));
      }
    } catch (error) {
      dispatch(addTrainerError(`Error adding trainer: ${error.message}`));
      dispatch(showResponseModal(`Error adding trainer: ${error.message}`, 'fail'));
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
        dispatch(editTrainerSuccess(data));
        dispatch(showResponseModal('Trainer edited successfully!', 'success'));
        history.push('/trainers');
      } else {
        dispatch(editTrainerError('Failed to edit trainer'));
        dispatch(showResponseModal(`Error editing trainer: ${data.message}`, 'fail'));
      }
    } catch (error) {
      dispatch(editTrainerError(`Error editing trainer: ${error.message}`));
      dispatch(showResponseModal(`Error editing trainer: ${error.message}`, 'fail'));
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
        dispatch(deleteTrainerSuccess(id));
        dispatch(showResponseModal('Trainer deleted successfully!', 'success'));
        getTrainers(dispatch);
      } else {
        dispatch(deleteTrainerError('Failed to delete trainer'));
        dispatch(showResponseModal(`Error deleting trainer: ${data.message}`, 'fail'));
      }
    } catch (error) {
      dispatch(deleteTrainerError(`Error deleting trainer: ${error.message}`));
      dispatch(showResponseModal(`Error deleting trainer: ${error.message}`, 'fail'));
    }
  };
};
