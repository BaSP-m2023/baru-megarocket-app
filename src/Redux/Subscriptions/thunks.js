import {
  putSubscriptionSuccess,
  putSubscriptionPending,
  putSubscriptionError,
  deleteSubscriptionSuccess,
  deleteSubscriptionPending,
  deleteSubscriptionError
} from './actions';

import { handleDisplayToast, setContentToast } from '../Shared/ResponseToast/actions';

export const putSubscription = (
  newSubscription,
  subscriptionById,
  subscriptions,
  setSubscriptions,
  id
) => {
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
        const updatedSubscriptions = subscriptions.map((sub) => {
          if (sub._id === data._id) {
            return {
              classes: data.classes,
              members: data.members,
              date: data.date
            };
          }
          return sub;
        });
        setSubscriptions(updatedSubscriptions);
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
      await fetch(`${process.env.REACT_APP_API_URL}/api/subscription/${subscriptionId}`, {
        method: 'DELETE'
      });
      dispatch(deleteSubscriptionSuccess(subscriptionId));
      dispatch(setContentToast({ message: 'Subscription has been deleted', state: 'success' }));
      dispatch(handleDisplayToast(true));
    } catch (e) {
      dispatch(deleteSubscriptionError(e.message));
      dispatch(setContentToast({ message: e.message, state: 'fail' }));
      dispatch(handleDisplayToast(true));
    }
  };
};

export default { putSubscription, deleteSubscription };
