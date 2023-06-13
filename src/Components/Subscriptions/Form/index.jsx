import React, { useState, useEffect } from 'react';
import styles from './form.module.css';
import { Link, useParams, useHistory } from 'react-router-dom';
import ResponseModal from '../../Shared/ResponseModal';
import ConfirmModal from '../../Shared/ConfirmModal';
import Button from '../../Shared/Button';
import Loader from '../../Shared/Loader';
import { Input } from '../../Shared/Inputs';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptions, addSubscriptions } from '../../../Redux/Subscriptions/thunks';
import { reset } from '../../../Redux/Subscriptions/actions';
const Form = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [subscriptionById, setSubscriptionById] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [state, setState] = useState([]);
  const [classes, setClasses] = useState([]);
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [responseModal, setResponseModal] = useState('');
  const [subscription, setSubscription] = useState({
    classes: '',
    members: '',
    date: ''
  });
  const success = useSelector((state) => state.subscriptions.success);
  const pending = useSelector((state) => state.subscriptions.isPending);

  useEffect(() => {
    id && fetchSubscriptionById(id);
    fetchClasses();
    fetchMembers();
  }, []);

  useEffect(() => {
    getSubscriptions(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(reset());
      history.push('/subscriptions');
    }
  }, [success]);

  const fetchClasses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/search`);
      const data = await response.json();
      const filteredClassesNotDeleted = data.data.filter((item) => !item.deleted);
      setClasses(filteredClassesNotDeleted);
    } catch (error) {
      throw new Error(error);
    }
  };
  const fetchMembers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member`);
      const data = await response.json();

      setMembers(data.data);
    } catch (error) {
      throw new Error(error);
    }
  };
  const handleShowConfirmModal = async () => {
    if (!showConfirmModal) {
      setShowConfirmModal(true);
      setShowModal(false);
    } else {
      setShowConfirmModal(false);
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
      setLoaded(true);
      setSubscriptionById(data.data);
    } catch (error) {
      throw new Error(error);
    }
  };
  const updateItem = async (newSubscription) => {
    if (newSubscription != subscriptionById) {
      try {
        const isoDate = newSubscription.date ? new Date(newSubscription.date).toISOString() : '';
        const body = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            classes: newSubscription.classes,
            members: newSubscription.members,
            date: isoDate
          })
        };
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/subscription/${id}`,
          body
        );
        const data = await response.json();
        if (data?.length !== 0 && !data.error) {
          setResponseModal('Subscription updated sucessfully!');
          setState('success');
          setShowModal(true);
          setTimeout(() => {
            setShowModal(false);
            history.push('/subscriptions');
          }, 1200);
        } else {
          setShowConfirmModal(false);
          setResponseModal('No Changes Found');
          setState('fail');
          setShowModal(true);
        }
      } catch (e) {
        throw new Error(e);
      }
    } else {
      setResponseModal('No changes made');
      setState('fail');
      setShowModal(true);
      setShowConfirmModal(false);
    }
  };
  const onChangeInput = (e) => {
    setSubscription({
      ...subscription,
      [e.target.name]: e.target.value
    });
    setState('');
    setResponseModal('');
    setShowModal(false);
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
        updateItem(newSubscription);
      } else {
        addSubscriptions(dispatch, newSubscription);
        setShowConfirmModal(false);
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
          {loaded ? (
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
          {loaded ? (
            <option>{`${subscription?.members?.name} ${subscription?.members?.lastName}`}</option>
          ) : (
            <option className={styles.textArea}>Select a Value</option>
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
      {showModal && (
        <Link to="/subscriptions">
          <ResponseModal state={state} message={responseModal} />
        </Link>
      )}
    </>
  );
};
export default Form;
