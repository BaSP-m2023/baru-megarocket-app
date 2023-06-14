import {
  putSubscriptionSuccess,
  putSubscriptionPending,
  putSubscriptionError,
  deleteSubscriptionSuccess,
  deleteSubscriptionPending,
  deleteSubscriptionError
} from './actions';

import { handleDisplayToast, setContentToast } from '../Shared/ResponseToast/actions';

export const putSubscription = (newSubscription, id) => {
  return async (dispatch) => {
    dispatch(putSubscriptionPending());
    try {
      const isoDate = newSubscription.date ? new Date(newSubscription.date).toISOString() : '';
      const body = JSON.stringify({
        classes: newSubscription.classes,
        members: newSubscription.members,
        date: isoDate
      });
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      });
      const data = await response.json();
      if (response.status === 200) {
        dispatch(putSubscriptionSuccess(data));
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
      dispatch(putSubscriptionError(e.message));
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
          method: 'DELETE'
        }
      );
      if (response.status === 200) {
        dispatch(deleteSubscriptionSuccess(subscriptionId));
        dispatch(setContentToast({ message: 'Subscription has been deleted', state: 'success' }));
        dispatch(handleDisplayToast(true));
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

export default { putSubscription, deleteSubscription };
