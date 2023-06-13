import {
  getSubscriptionsPending,
  getSubscriptionsSuccess,
  getSubscriptionsError,
  getByIdSubscriptionsPending,
  getByIdSubscriptionsSuccess,
  getByIdSubscriptionsError,
  postSubscriptionsPending,
  postSubscriptionsSuccess,
  postSubscriptionsError
} from './actions';

export const getSubscriptions = async (dispatch) => {
  dispatch(getSubscriptionsPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription`);
    const data = await response.json();
    dispatch(getSubscriptionsSuccess(data.data));
  } catch (error) {
    dispatch(getSubscriptionsError(error.toString()));
  }
};

export const postSubscriptions = async (dispatch, newSubscription) => {
  dispatch(postSubscriptionsPending());
  try {
    const isoDate = newSubscription.date ? new Date(newSubscription.date).toISOString() : '';
    const body = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        classes: newSubscription.classes,
        members: newSubscription.members,
        date: isoDate
      })
    };
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription`, body);
    const data = await response.json();
    if (response.status === 201) {
      dispatch(postSubscriptionsSuccess(data));
    }
    if (response.status === 400) {
      throw new Error(data.message);
    }
  } catch (error) {
    dispatch(postSubscriptionsError(error.message));
  }
};
export const getByIdSubscriptions = async (dispatch, id) => {
  dispatch(getByIdSubscriptionsPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription/${id}`);
    const data = await response.json();
    dispatch(getByIdSubscriptionsSuccess(data));
  } catch (error) {
    dispatch(getByIdSubscriptionsError(error.toString()));
  }
};
