import React, { useState, useEffect } from 'react';
import styles from './members.module.css';
import List from './Table/List';
import ResponseModal from '../Shared/ResponseModal';
import Button from '../Shared/Button';
import { Link } from 'react-router-dom';
import Loader from '../Shared/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getMembers } from '../../Redux/Members/thunks';

function Members() {
  const [showToast, setShowToast] = useState(false);
  const [stateToast, setStateToast] = useState('');
  const [messageToast, setMessageToast] = useState('');

  // useEffect(() => {
  //   const getMembers = async () => {
  //     const membersFromDb = await getAllMembers();
  //     setMembers(membersFromDb);
  //   };
  //   getMembers();
  // }, []);

  // const getAllMembers = async () => {
  //   try {
  //     const res = await fetch(`${process.env.REACT_APP_API_URL}/api/member`);
  //     const { data } = await res.json();
  //     return data;
  //   } catch (error) {
  //     handleToast({
  //       content: 'Something went wrong :( try again later',
  //       className: 'toast-wrong'
  //     });
  //     return [];
  //   }
  // };

  const deleteMember = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`, {
        method: 'DELETE'
      });

      if (res.status === 200) {
        handleToast(true, 'success', 'Member deleted!');
        // setMembers(members.filter((member) => member._id !== id));
        setTimeout(() => {
          handleShowToast(false);
        }, 1500);
      }

      if (res.status !== 200) {
        handleToast(true, 'fail', 'Member cant be deleted');
        setTimeout(() => {
          handleShowToast(false);
        }, 1500);
      }
    } catch (error) {
      handleToast(true, 'fail', error.message);
      setTimeout(() => {
        handleShowToast(false);
      }, 1500);
    }
  };

  const handleShowToast = (show) => {
    setShowToast(show);
  };

  const handleToast = (show, state, message) => {
    handleShowToast(show);
    setStateToast(state);
    setMessageToast(message);
  };

  const dispatch = useDispatch();

  const members = useSelector((state) => state.members.data);
  const pending = useSelector((state) => state.members.isPending);

  useEffect(() => {
    getMembers(dispatch);
  }, [dispatch]);

  return (
    <section className={styles.container}>
      {pending && <Loader />}
      {!pending && members.length > 0 ? (
        <List members={members} deleteMember={deleteMember} />
      ) : null}
      {!pending && members.length === 0 && 'There are no members'}
      <Link to="/members/add">
        <Button classNameButton="addButton" text="Add new member" />
      </Link>
      {showToast && (
        <ResponseModal handler={handleShowToast} state={stateToast} message={messageToast} />
      )}
    </section>
  );
}

export default Members;
