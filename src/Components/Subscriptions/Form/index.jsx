/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styles from './form.module.css';
import { Link, useParams, useHistory } from 'react-router-dom';
import ResponseModal from '../../Shared/ResponseModal';
import ConfirmModal from '../../Shared/ConfirmModal';
import Button from '../../Shared/Button';
import { Input } from '../../Shared/Inputs';
const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const [subscriptionById, setSubscriptionById] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [state, setState] = useState([]);
  const [classes, setClasses] = useState([]);
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [responseModal, setResponseModal] = useState('');
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscription, setSubscription] = useState({
    classes: '',
    members: '',
    date: ''
  });
  useEffect(() => {
    fetchSubscriptions();
    id && fetchSubscriptionById(id);
    fetchClasses();
    fetchMembers();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription`);
      const data = await response.json();
      setSubscriptions(data.data);
    } catch (error) {
      throw new Error(error);
    }
  };
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
        setResponseModal('Subscription created sucessfully!');
        setShowModal(true);
        setState('success');
        setTimeout(() => {
          setShowModal(false);
          history.goBack();
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
        setResponseModal(response.statusText);
        setState('fail');
        setShowModal(true);
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
        if (data.length !== 0 && !data.error) {
          setResponseModal('Subscription updated sucessfully!');
          setShowModal(true);
          setState('success');
          setTimeout(() => {
            setShowModal(false);
            history.goBack();
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
          setResponseModal('Subscription not Updated!');
          setShowModal(true);
          setState('fail');
          setShowConfirmModal(false);
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
        addItem(newSubscription);
      }
      setSubscription({
        classes: '',
        members: '',
        date: ''
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <form className={styles.createForm} onSubmit={onSubmit}>
          {!id ? (
            <h2 className={styles.title}>Add Subscription</h2>
          ) : (
            <>
              <h2 className={styles.title}>Edit Subscription</h2>
              <h3>ID:{id}</h3>
            </>
          )}
          <label>Class:</label>
          <select
            className={styles.select}
            id="classes"
            name="classes"
            value={subscription.classes}
            onChange={onChangeInput}
          >
            {loaded ? (
              <option>{`${subscription.classes.day} ${subscription.classes.time}`}</option>
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
          <label>Member:</label>
          <select
            className={styles.select}
            id="members"
            name="members"
            value={subscription.members}
            onChange={onChangeInput}
          >
            {loaded ? (
              <option>{`${subscription.members.name} ${subscription.members.lastName}`}</option>
            ) : (
              <option>Select a Value</option>
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
            className={styles.input}
            name="date"
            type="date"
            value={subscription.date.slice(0, 10)}
            change={onChangeInput}
          />
          <div>
            <Link to="/subscriptions">
              <Button classNameButton={'cancelButton'} text={'Cancel'} />
            </Link>
            <Button text={'Submit'} classNameButton={'submitButton'} />
          </div>
        </form>
      </div>
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
      {showModal && (
        <Link to="/subscriptions">
          <ResponseModal state={state} message={responseModal} />
        </Link>
      )}
    </>
  );
};
export default Form;
