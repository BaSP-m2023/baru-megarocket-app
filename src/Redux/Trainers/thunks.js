import { getTrainersPending, getTrainersSuccess, getTrainersError } from './actions';

export const getTrainers = async (dispatch) => {
  dispatch(getTrainersPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`);
    const data = await response.json();
    dispatch(getTrainersSuccess(data.data));
  } catch (error) {
    dispatch(getTrainersError(error));
  }
};
