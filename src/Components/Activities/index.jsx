import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './activities.module.css';

import { getActivities } from '../../Redux/Activities/thunks';

import Table from './Table';
import Button from '../Shared/Button';
import ResponseModal from '../Shared/ResponseModal';
import Loader from '../Shared/Loader';

function Activities() {
  const { list, isPending, response, success } = useSelector((state) => state.activities);
  const [responseModal, setResponseModal] = useState({ show: false, state: '', message: '' });
  const dispatch = useDispatch();
  // const location = useLocation();
  // const history = useHistory();
  // console.log(history);

  const handleResponse = () => {
    setResponseModal({
      ...responseModal,
      show: !responseModal.show,
      state: response.state,
      message: response.message
    });

    setTimeout(() => {
      setResponseModal({});
    }, 2000);
  };

  useEffect(() => {
    getActivities(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      handleResponse();
    }
  }, [success]);

  const deleteActivity = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
        method: 'DELETE'
      });
      const { message } = await res.json();
      if (res.status === 200) {
        handleResponse('success', message);
        getActivities(dispatch);
      }
      if (res.status == 400) {
        handleResponse('fail', message);
      }
    } catch (error) {
      handleResponse('fail', error);
    }
  };

  if (isPending) {
    return (
      <section className={styles.container}>
        <Loader />
      </section>
    );
  }

  return (
    <section className={styles.container}>
      {responseModal.show && (
        <ResponseModal
          handler={handleResponse}
          state={responseModal.state}
          message={responseModal.message}
        />
      )}
      {list.length !== 0 ? (
        <Table activities={list} onDelete={deleteActivity} />
      ) : (
        'There are not activities yet, add new ones!!'
      )}
      <Link to={'activities/add'}>
        <Button text={'+ Add new'} classNameButton={'addButton'} />
      </Link>
    </section>
  );
}

export default Activities;
