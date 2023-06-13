import React, { useState, useEffect } from 'react';
import styles from './form.module.css';
import { Link, useParams, useHistory } from 'react-router-dom';
import ResponseModal from '../../Shared/ResponseModal';
import ConfirmModal from '../../Shared/ConfirmModal';
import Button from '../../Shared/Button';
import { Input } from '../../Shared/Inputs';
import { useDispatch, useSelector } from 'react-redux';
import { putSubscription } from '../../../Redux/Subscriptions/thunks';
import { reset } from '../../../Redux/Subscriptions/actions';
import { handleDisplayToast } from '../../../Redux/Shared/ResponseToast/actions';
import { getClasses } from '../../../Redux/Classes/thunks';
import { getMembers } from '../../../Redux/Members/thunks';
import Loader from '../../Shared/Loader';
const Form = () => {
  const dispatch = useDispatch();
  const pending = useSelector((state) => state.subscription.isPending);
  const success = useSelector((state) => state.subscription.success);
  const pendingClasses = useSelector((state) => state.classes.isPending);
  const pendingMembers = useSelector((state) => state.members.isPending);
  const classes = useSelector((state) => state.classes.data);
  const members = useSelector((state) => state.members.data);
  const { show, message, state } = useSelector((state) => state.toast);
  const { id } = useParams();
  const history = useHistory();
  const [subscriptionById, setSubscriptionById] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscription, setSubscription] = useState({
    classes: '',
    members: '',
    date: ''
  });
  useEffect(() => {
    fetchSubscriptions();
    id && fetchSubscriptionById(id);
    dispatch(getClasses);
    dispatch(getMembers);
  }, []);

  useEffect(() => {
    if (success) {
      history.push('/subscriptions');
      dispatch(reset());
    }
  }, [success]);

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription`);
      const data = await response.json();
      setSubscriptions(data.data);
    } catch (error) {
      throw new Error(error);
    }
  };
  const handleShowConfirmModal = async () => {
    if (!showConfirmModal) {
      setShowConfirmModal(true);
    } else {
      setShowConfirmModal(false);
    }
  };
  const addItem = async (newSubscription) => {
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription/`, body);
      const data = await response.json();
      if (data.length !== 0 && !data.error) {
        setTimeout(() => {
          history.push('/subscriptions');
        }, 1200);
        setSubscriptions([
          ...subscriptions,
          {
            _id: data._id,
            classes: data.classes._id,
            members: data.members._id,
            date: data.date
          }
        ]);
      } else {
        setShowConfirmModal(false);
      }
    } catch (e) {
      throw new Error(e);
    }
  };
  const fetchSubscriptionById = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription/${id}`);
      const data = await response.json();
      setSubscription({
        classes: data.data.classes,
        members: data.data.members,
        date: data.data.date
      });
      setSubscriptionById(data.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const onChangeInput = (e) => {
    setSubscription({
      ...subscription,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleShowConfirmModal();
  };
  const onConfirm = () => {
    try {
      const newSubscription = {
        members: subscription.members,
        classes: subscription.classes,
        date: subscription.date
      };
      if (id) {
        dispatch(
          putSubscription(newSubscription, subscriptionById, subscriptions, setSubscriptions, id)
        );
        setShowConfirmModal(false);
      } else {
        addItem(newSubscription);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  if (pending) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <form className={styles.container} onSubmit={onSubmit}>
        {!id ? (
          <h2 className={styles.title}>Add Subscription</h2>
        ) : (
          <h2 className={styles.title}>Edit Subscription</h2>
        )}
        <label className={styles.label}>Class</label>
        <select
          className={styles.flex}
          id="classes"
          name="classes"
          value={subscription.classes}
          onChange={onChangeInput}
        >
          {!pendingClasses ? (
            <option>{`${subscription?.classes?.day} ${subscription?.classes?.time}`}</option>
          ) : (
            <option>Select a Value</option>
          )}
          {classes.map((item) => {
            return (
              <option key={item._id} value={item._id}>
                {`${item.day} ${item.time}`}
              </option>
            );
          })}
        </select>
        <label className={styles.label}>Member</label>
        <select
          className={styles.flex}
          id="members"
          name="members"
          value={subscription.members}
          onChange={onChangeInput}
        >
          {pendingMembers ? (
            <option className={styles.textArea}>Select a Value</option>
          ) : (
            <option>{`${subscription?.members?.name} ${subscription?.members?.lastName}`}</option>
          )}
          {members.map((member) => {
            return (
              <option key={member._id} value={member._id}>
                {`${member.name} ${member.lastName}`}
              </option>
            );
          })}
        </select>
        <Input
          labelText={'Date'}
          name="date"
          type="date"
          value={subscription?.date.slice(0, 10)}
          change={onChangeInput}
        />
        <div className={styles.btnContainer}>
          <Link to="/subscriptions">
            <Button classNameButton={'cancelButton'} text={'Cancel'} />
          </Link>
          <Button text={'Submit'} classNameButton={'submitButton'} />
        </div>
      </form>
      {showConfirmModal && (
        <ConfirmModal
          handler={() => handleShowConfirmModal()}
          title={'Are you sure?'}
          onAction={() => onConfirm()}
          reason="submit"
        >
          We give you a last chance to change your mind
        </ConfirmModal>
      )}
      {show && (
        <ResponseModal
          handler={() => dispatch(handleDisplayToast(false))}
          state={state}
          message={message}
        />
      )}
    </>
  );
};
export default Form;
