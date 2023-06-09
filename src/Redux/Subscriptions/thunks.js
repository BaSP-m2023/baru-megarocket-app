import {
  getSubscriptionsPending,
  getSubscriptionsSuccess,
  getSubscriptionsError,
  addSubscriptionsPending,
  addSubscriptionsSuccess,
  addSubscriptionsError,
  editSubscriptionSuccess,
  editSubscriptionPending,
  editSubscriptionError,
  deleteSubscriptionSuccess,
  deleteSubscriptionPending,
  deleteSubscriptionError,
  resetSuccess
} from 'Redux/Subscriptions/actions';

import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';

const token = sessionStorage.getItem('token');

export const getSubscriptions = () => {
  return async (dispatch) => {
    dispatch(getSubscriptionsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token
        }
      });
      const { data, message, error } = await response.json();
      if (!error) {
        dispatch(getSubscriptionsSuccess(data));
      } else {
        dispatch(getSubscriptionsError(message));
        dispatch(handleDisplayToast(true));
        dispatch(setContentToast({ message: message, state: 'fail' }));
      }
    } catch (error) {
      dispatch(getSubscriptionsError(error));
      dispatch(handleDisplayToast(true));
      dispatch(setContentToast({ message: error.message, state: 'fail' }));
    }
  };
};

export const addSubscriptions = (newAddSubscription) => {
  return async (dispatch) => {
    dispatch(addSubscriptionsPending());
    try {
      const isoDate = newAddSubscription.date
        ? new Date(newAddSubscription.date).toISOString()
        : new Date();
      const body = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify({
          classes: newAddSubscription.classes,
          members: newAddSubscription.members,
          date: isoDate
        })
      };
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription`, body);
      const data = await response.json();
      if (!data.error) {
        dispatch(addSubscriptionsSuccess(data));
        dispatch(setContentToast({ message: 'Subscription Created', state: 'success' }));
        dispatch(handleDisplayToast(true));
      } else {
        dispatch(addSubscriptionsError(data.message));
        dispatch(handleDisplayToast(true));
        dispatch(setContentToast({ message: data.message, state: 'fail' }));
      }
    } catch (error) {
      dispatch(addSubscriptionsError(error));
      dispatch(setContentToast({ message: error.message, state: 'fail' }));
      dispatch(handleDisplayToast(true));
    }
  };
};

export const editSubscription = (newEditSubscription, id) => {
  return async (dispatch) => {
    dispatch(editSubscriptionPending());
    try {
      const isoDate = newEditSubscription.date
        ? new Date(newEditSubscription.date).toISOString()
        : new Date().toISOString;
      const body = JSON.stringify({
        classes: newEditSubscription.classes,
        members: newEditSubscription.members,
        date: isoDate
      });
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: body
      });
      const data = await response.json();
      if (response.status === 200) {
        dispatch(editSubscriptionSuccess(data));
        dispatch(setContentToast({ message: 'Subscription edited', state: 'success' }));
        dispatch(handleDisplayToast(true));
      }
      if (response.status === 400) {
        throw new Error('Subscription not edited');
      }
      if (response.status === 404) {
        throw new Error('An error was ocurred');
      }
    } catch (e) {
      dispatch(editSubscriptionError(e.message));
      dispatch(setContentToast({ message: e.message, state: 'fail' }));
      dispatch(handleDisplayToast(true));
    }
  };
};

export const deleteSubscription = (subscriptionId) => {
  return async (dispatch) => {
    dispatch(deleteSubscriptionPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/subscription/${subscriptionId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            token: token
          }
        }
      );
      if (response.status === 200) {
        dispatch(deleteSubscriptionSuccess(subscriptionId));
        dispatch(setContentToast({ message: 'Subscription has been deleted', state: 'success' }));
        dispatch(handleDisplayToast(true));
        dispatch(resetSuccess());
      }
      if (response.status === 404) {
        dispatch(deleteSubscriptionError());
        dispatch(setContentToast({ message: 'Subscription not deleted', state: 'fail' }));
        dispatch(handleDisplayToast(true));
      }
    } catch (e) {
      dispatch(deleteSubscriptionError(e.message));
      dispatch(setContentToast({ message: e.message, state: 'fail' }));
      dispatch(handleDisplayToast(true));
    }
  };
};
