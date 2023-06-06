import React, { useEffect, useState } from 'react';
import styles from './members.module.css';
import List from './Table/List';
import ResponseModal from '../Shared/ResponseModal';
import { Link } from 'react-router-dom';

function Members() {
  const [members, setMembers] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [stateToast, setStateToast] = useState('');
  const [messageToast, setMessageToast] = useState('');

  useEffect(() => {
    const getMembers = async () => {
      const membersFromDb = await getAllMembers();
      setMembers(membersFromDb);
    };
    getMembers();
  }, []);

  const getAllMembers = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/member`);
      const { data } = await res.json();
      return data;
    } catch (error) {
      handleToast({
        content: 'Something went wrong :( try again later',
        className: 'toast-wrong'
      });
      return [];
    }
  };

  const deleteMember = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`, {
        method: 'DELETE'
      });

      if (res.status === 200) {
        handleToast(true, 'success', 'Member deleted!');
        setMembers(members.filter((member) => member._id !== id));
        setTimeout(() => {
          handleShowToast(false);
        }, 1500);
      }

      if (res.status !== 200) {
        handleToast(true, 'fail', 'Member cant be deleted!');
        setTimeout(() => {
          handleShowToast(false);
        }, 1500);
      }
    } catch (error) {
      console.log(error);
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

  return (
    <section className={styles.container}>
      {members.length > 0 ? (
        <List members={members} deleteMember={deleteMember} />
      ) : (
        'There are not members yet :('
      )}
      <Link to="/members/add">
        <button className={`${styles['btn-new']}`}>+ Add new</button>
      </Link>
      {showToast && (
        <ResponseModal handler={handleShowToast} state={stateToast} message={messageToast} />
      )}
    </section>
  );
}

export default Members;
