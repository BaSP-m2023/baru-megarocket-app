import {
  getTrainersPending,
  getTrainersSuccess,
  getTrainersError,
  addTrainerPending,
  addTrainerSuccess,
  addTrainerError,
  // updateTrainerPending,
  // updateTrainerSuccess,
  // updateTrainerError,
  // deleteTrainerPending,
  // deleteTrainerSuccess,
  // deleteTrainerError,
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
