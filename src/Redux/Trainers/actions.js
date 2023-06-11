import { GET_TRAINERS_PENDING, GET_TRAINERS_SUCCESS, GET_TRAINERS_ERROR } from './constants';

export const getTrainersPending = () => ({
  type: GET_TRAINERS_PENDING
});

export const getTrainersSuccess = (trainers) => ({
  type: GET_TRAINERS_SUCCESS,
  payload: trainers
});

export const getTrainersError = (error) => ({
  type: GET_TRAINERS_ERROR,
  payload: error
});
