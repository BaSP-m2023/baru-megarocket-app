import {
  putSubscriptionSuccess,
  putSubscriptionPending,
  putSubscriptionError,
  deleteSubscriptionSuccess,
  deleteSubscriptionPending,
  deleteSubscriptionError
} from './actions';

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
      if (response.ok) {
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
      }
    } catch (e) {
      dispatch(putSubscriptionError(e.message));
      throw new Error(e);
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
    } catch (error) {
      dispatch(deleteSubscriptionError(error.message));
      throw new Error(error);
    }
  };
};

export default { putSubscription, deleteSubscription };
