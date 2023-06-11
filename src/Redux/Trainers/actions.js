import {
  GET_TRAINERS_PENDING,
  GET_TRAINERS_SUCCESS,
  GET_TRAINERS_ERROR,
  ADD_TRAINER_PENDING,
  ADD_TRAINER_SUCCESS,
  ADD_TRAINER_ERROR,
  SHOW_RESPONSE_MODAL,
  HIDE_RESPONSE_MODAL
} from './constants';

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

export const addTrainerPending = (trainer) => ({
  type: ADD_TRAINER_PENDING,
  payload: trainer
});

export const addTrainerSuccess = (trainer) => ({
  type: ADD_TRAINER_SUCCESS,
  payload: trainer
});

export const addTrainerError = (error) => ({
  type: ADD_TRAINER_ERROR,
  payload: error
});

export const showResponseModal = (message, state) => {
  return {
    type: SHOW_RESPONSE_MODAL,
    payload: {
      message,
      state
    }
  };
};

export const hideResponseModal = () => {
  return {
    type: HIDE_RESPONSE_MODAL
  };
};
