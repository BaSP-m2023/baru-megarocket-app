import React, { useState, useEffect } from 'react';
import styles from './form.module.css';
import { Link, useParams, useHistory } from 'react-router-dom';
import ResponseModal from '../../Shared/ResponseModal';
import { handleDisplayToast } from '../../../Redux/Shared/ResponseToast/actions';
import ConfirmModal from '../../Shared/ConfirmModal';
import Button from '../../Shared/Button';
import Loader from '../../Shared/Loader';
import { Input } from '../../Shared/Inputs';
import { useDispatch, useSelector } from 'react-redux';
import {
  getByIdSubscriptions,
  addSubscriptions,
  putSubscription
} from '../../../Redux/Subscriptions/thunks';
import { reset } from '../../../Redux/Subscriptions/actions';
import { getClasses } from '../../../Redux/Classes/thunks';
import { getMembers } from '../../../Redux/Members/thunks';
const Form = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [subscription, setSubscription] = useState({
    classes: '',
    members: '',
    date: ''
  });
  const { show, message, state } = useSelector((state) => state.toast);
  const success = useSelector((state) => state.subscriptions.success);
  const pending = useSelector((state) => state.subscriptions.isPending);
  const pendingClasses = useSelector((state) => state.classes.isPending);
  const pendingMembers = useSelector((state) => state.members.is);
  const classes = useSelector((state) => state.classes.data);
  const members = useSelector((state) => state.members.data);
  useEffect(() => {
    id && getByIdSubscriptions(dispatch, id);
    dispatch(getClasses);
    dispatch(getMembers);
  }, []);

  useEffect(() => {
    if (success) {
      history.push('/subscriptions');
      dispatch(reset());
    }
  }, [success]);

  const handleShowConfirmModal = async () => {
    if (!showConfirmModal) {
      setShowConfirmModal(true);
    } else {
      setShowConfirmModal(false);
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
        putSubscription(dispatch, newSubscription, getByIdSubscriptions(dispatch, id));
        setShowConfirmModal(false);
      } else {
        addSubscriptions(dispatch, newSubscription);
        setShowConfirmModal(false);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  if (pending && id) {
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
          {!pendingClasses && id ? (
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
          {pendingMembers || !id ? (
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
          Are you sure ?
        </ConfirmModal>
      )}
      {show && (
        <ResponseModal
          state={state}
          message={message}
          handler={() => dispatch(handleDisplayToast())}
        />
      )}
    </>
  );
};
export default Form;
