import {
  GET_TRAINERS_PENDING,
  GET_TRAINERS_SUCCESS,
  GET_TRAINERS_ERROR,
  ADD_TRAINER_PENDING,
  ADD_TRAINER_SUCCESS,
  ADD_TRAINER_ERROR,
  EDIT_TRAINER_PENDING,
  EDIT_TRAINER_SUCCESS,
  EDIT_TRAINER_ERROR,
  DELETE_TRAINER_PENDING,
  DELETE_TRAINER_SUCCESS,
  DELETE_TRAINER_ERROR,
  SET_REDIRECT
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

export const addTrainerPending = () => ({
  type: ADD_TRAINER_PENDING
});

export const addTrainerSuccess = (trainer) => ({
  type: ADD_TRAINER_SUCCESS,
  payload: trainer
});

export const addTrainerError = (error) => ({
  type: ADD_TRAINER_ERROR,
  payload: error
});

export const editTrainerPending = () => {
  return {
    type: EDIT_TRAINER_PENDING
  };
};
export const editTrainerSuccess = (trainer) => {
  return {
    type: EDIT_TRAINER_SUCCESS,
    payload: trainer
  };
};
export const editTrainerError = (error) => {
  return {
    type: EDIT_TRAINER_ERROR,
    payload: error
  };
};
export const deleteTrainerPending = () => {
  return {
    type: DELETE_TRAINER_PENDING
  };
};
export const deleteTrainerSuccess = (trainer) => {
  return {
    type: DELETE_TRAINER_SUCCESS,
    payload: trainer
  };
};
export const deleteTrainerError = (error) => {
  return {
    type: DELETE_TRAINER_ERROR,
    payload: error
  };
};
export const setRedirect = () => {
  return {
    type: SET_REDIRECT
  };
};
