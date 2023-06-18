import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';

import { resetState } from '../../../Redux/Subscriptions/actions';
import { handleDisplayToast } from '../../../Redux/Shared/ResponseToast/actions';
import { getClasses } from '../../../Redux/Classes/thunks';
import { getMembers } from '../../../Redux/Members/thunks';
import {
  addSubscriptions,
  getSubscriptions,
  editSubscription
} from '../../../Redux/Subscriptions/thunks';

import ResponseModal from '../../Shared/ResponseModal';
import ConfirmModal from '../../Shared/ConfirmModal';
import Button from '../../Shared/Button';
import Loader from '../../Shared/Loader';
import styles from './form.module.css';
import subscriptionSchema from 'Validations/subscription';

const Form = () => {
  const { id } = useParams();
  useEffect(() => {
    dispatch(getClasses);
    dispatch(getMembers);
    dispatch(getSubscriptions);
  }, []);
  const history = useHistory();
  const dispatch = useDispatch();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const subscriptions = useSelector((state) => state.subscriptions.data);
  const classes = useSelector((state) => state.classes.data);
  const members = useSelector((state) => state.members.data);
  const success = useSelector((state) => state.subscriptions.success);
  const pending = useSelector((state) => state.subscriptions.isPending);
  const { show, message, state } = useSelector((state) => state.toast);
  const subscription = subscriptions.find((subscription) => subscription._id === id || '');
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(subscriptionSchema),
    defaultValues: {
      classes: subscription ? subscription.classes.day : '',
      members: subscription ? subscription.members.name : '',
      date: ''
    }
  });
  const filteredClasses = classes.filter(
    (item) => !item.deleted && item.activity !== null && item.members !== null
  );
  useEffect(() => {
    if (id) {
      subscriptionById(id);
    }
  }, [subscriptions, id, reset, getValues]);
  const subscriptionById = async () => {
    try {
      setValue('classes', subscription.classes);
      setValue('members', subscription.members);
      setValue('date', subscription.date);
    } catch (error) {
      console.log(error);
    }
  };
  const onConfirm = (data) => {
    try {
      const newAddSubscription = {
        members: data.members,
        classes: data.classes,
        date: new Date()
      };
      const newEditSubscription = {
        members: typeof data.members === 'string' ? data.members : data.members._id,
        classes: typeof data.classes === 'string' ? data.classes : data.classes._id,
        date: data.date
      };
      if (id) {
        editSubscription(dispatch, newEditSubscription, id);
        setShowConfirmModal(false);
      } else {
        addSubscriptions(dispatch, newAddSubscription);
        setShowConfirmModal(false);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    if (success) {
      history.push('/subscriptions');
      dispatch(resetState());
      reset();
    }
  }, [success]);

  const handleShowConfirmModal = async () => {
    if (!showConfirmModal) {
      setShowConfirmModal(true);
    } else {
      setShowConfirmModal(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleShowConfirmModal();
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
        <select className={styles.flex} id="classes" name="classes" {...register('classes')}>
          {getValues('classes') === '' ? (
            <option value={''} className={styles.textArea}>
              Select a Value
            </option>
          ) : (
            <option value={getValues('classes')}>{` ${getValues('classes.day')} ${getValues(
              'classes.time'
            )} `}</option>
          )}

          {filteredClasses.map((item) => {
            return (
              <option key={item._id} value={item._id}>
                {`${item.activity.name}: ${item.day} ${item.time}`}
              </option>
            );
          })}
        </select>
        {errors.classes && <p className={styles.error}>{errors.classes?.message}</p>}
        <label className={styles.label}>Member</label>
        <select className={styles.flex} id="members" name="members" {...register('members')}>
          {getValues('members') === '' ? (
            <option value={''} className={styles.textArea}>
              Select a Value
            </option>
          ) : (
            <option value={getValues('members')}>{`${getValues('members.name')} ${getValues(
              'members.lastName'
            )} `}</option>
          )}
          {members.map((member) => {
            return (
              <option key={member._id} value={member._id}>
                {`${member.name} ${member.lastName}`}
              </option>
            );
          })}
        </select>
        {errors.members && <p className={styles.error}>{errors.members?.message}</p>}

        <div className={styles.btnContainer}>
          <Link to="/subscriptions">
            <Button action={() => reset()} classNameButton={'cancelButton'} text={'Cancel'} />
          </Link>
          <Button text={'Submit'} classNameButton={'submitButton'} />
        </div>
      </form>

      {showConfirmModal && (
        <ConfirmModal
          handler={() => handleShowConfirmModal()}
          title={'Are you sure?'}
          onAction={handleSubmit(onConfirm)}
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
