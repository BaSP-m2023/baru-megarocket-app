import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useForm, useController } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './form.module.css';

import { resetState } from 'Redux/Subscriptions/actions';
import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';
import { getClasses } from 'Redux/Classes/thunks';
import { getMembers } from 'Redux/Members/thunks';
import { addSubscriptions, getSubscriptions, editSubscription } from 'Redux/Subscriptions/thunks';
import subscriptionSchema from 'Validations/subscription';

import Select from 'react-select';
import ResponseModal from 'Components/Shared/ResponseModal';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import { Button } from 'Components/Shared/Button';
import Loader from 'Components/Shared/Loader';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [filteredClass, setFilteredClass] = useState([]);

  const subscriptions = useSelector((state) => state.subscriptions.data);
  const { data: classes, isPending: classesPending } = useSelector((state) => state.classes);
  const members = useSelector((state) => state.members.data);
  const success = useSelector((state) => state.subscriptions.success);
  const pending = useSelector((state) => state.subscriptions.isPending);
  const { show, message, state } = useSelector((state) => state.toast);
  const subscription = subscriptions.find((subscription) => subscription._id === id || '');
  const {
    handleSubmit,
    getValues,
    reset,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(subscriptionSchema),
    defaultValues: {
      members: subscription ? subscription.members._id : '',
      classes: subscription ? subscription.classes._id : ''
    }
  });
  const {
    field: { value: member, onChange: membersOnChange }
  } = useController({ name: 'members', control });
  const {
    field: { value: clas, onChange: clasOnChange }
  } = useController({ name: 'classes', control });
  const filterClass = (data) => {
    const filteredClasses = data.filter((item) => item.activity !== null && item.members !== null);
    setFilteredClass(filteredClasses);
  };

  useEffect(() => {
    dispatch(getClasses());
    dispatch(getMembers());
    dispatch(getSubscriptions());
  }, []);

  useEffect(() => {
    filterClass(classes);
  }, [classes]);
  const onConfirm = (data) => {
    try {
      if (id) {
        dispatch(editSubscription(data, id));
        setShowConfirmModal(false);
      } else {
        const subClass = classes.find((c) => c._id === data.classes) || '';
        if (subClass.capacity > subClass.subscribed) {
          dispatch(addSubscriptions(data));
          setShowConfirmModal(false);
        } else {
          dispatch(setContentToast({ message: 'Full Class', state: 'fail' }));
          dispatch(handleDisplayToast(true));
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  const optionsMember = members.map((member) => ({
    value: member._id,
    label: `${member.name} ${member.lastName}`
  }));
  const optionsClasses = filteredClass.map((classes) => ({
    value: classes._id,
    label: `${classes.day} ${classes.time}`
  }));
  useEffect(() => {
    if (success) {
      dispatch(resetState());
      history.push('/user/admin/subscriptions');
    }
  }, [success]);

  const handleShowConfirmModal = async () => {
    if (!showConfirmModal) {
      setShowConfirmModal(true);
    } else {
      setShowConfirmModal(false);
    }
  };

  const onSubmit = () => {
    handleShowConfirmModal();
  };

  if ((pending || classesPending) && id) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }
  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.formTitle}>
          {!id ? (
            <h2 className={styles.title}>Add Subscription</h2>
          ) : (
            <h2 className={styles.title}>Edit Subscription</h2>
          )}
          <span className={styles.closeButton} onClick={() => history.goBack()}>
            &times;
          </span>
        </div>
        <div className={styles.content}>
          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            data-testid="subscriptions-form-container"
          >
            <div className={styles.formGroup}>
              <label className={styles.label}>Member</label>
              <Select
                className={styles.flex}
                value={member ? optionsMember.find((t) => t.value === member) : member}
                defaultValue={{
                  value: getValues('members'),
                  label: `${getValues('members.name')} ${getValues('members.lastName')}`
                }}
                name="members"
                options={optionsMember}
                placeholder="Select a Member"
                onChange={(e) => membersOnChange(e.value)}
              />
              {errors.members?.message && (
                <span className={styles.error}>{errors.members.message}</span>
              )}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Classes</label>
              <Select
                className={styles.flex}
                value={clas ? optionsClasses.find((t) => t.value === clas) : clas}
                defaultValue={{
                  value: getValues('classes'),
                  label: `${getValues('classes.day')} ${getValues('classes.time')}`
                }}
                name="classes"
                options={optionsClasses}
                placeholder="Select a Class"
                onChange={(e) => clasOnChange(e.value)}
              />
              {errors.classes && <p className={styles.error}>{errors.classes?.message}</p>}
            </div>
            <div className={styles.btnContainer} data-testid="subscriptions-form-buttons">
              <Link to="/user/admin/subscriptions">
                <Button action={() => reset()} classNameButton={'cancelButton'} text={'Cancel'} />
              </Link>
              <Button text={'Submit'} classNameButton={'submitButton'} />
            </div>
          </form>
        </div>
      </div>
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
