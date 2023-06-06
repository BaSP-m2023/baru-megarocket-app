import React, { useEffect, useState } from 'react';
import styles from './members.module.css';
import List from './Table/List';
import DeleteModal from './Modal/DeleteModal';
import Toast from './Toast/Toast';
import ConfirmModal from '../Shared/ConfirmModal';
import { Link } from 'react-router-dom';

function Members() {
  const [members, setMembers] = useState([]);
  const [memberToDelete, setMember] = useState({});
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastContent, setContent] = useState({});

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
      const data = await res.json();

      if (res.status === 200) {
        handleToast({ content: data.message, className: 'toast-ok' });
        setMembers(members.filter((member) => member._id !== id));
      }

      if (res.status !== 200) {
        handleToast({ content: data.msg, className: 'toast-wrong' });
      }

      handleModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = (member = {}) => {
    setMember(member);
    setModal(!modal);
  };

  const handleToast = (msg) => {
    setContent(msg);
    setToast(!toast);
  };

  return (
    <section className={styles.container}>
      {members.length > 0 ? (
        <List members={members} handleModal={handleModal} />
      ) : (
        'There are not members yet :('
      )}
      <Link to="/members/add">
        <button className={`${styles['btn-new']}`}>+ Add new</button>
      </Link>
      {modal && <DeleteModal hide={handleModal} onDelete={deleteMember} member={memberToDelete} />}
      {toast && (
        <Toast
          handler={handleToast}
          content={toastContent.content}
          classes={toastContent.className}
        />
      )}
      {modal && (
        <ConfirmModal
          title="Delete member"
          handler={handleModal}
          onAction={deleteMember}
          reason={'delete'}
        >
          Are you sure you wanna delete this member?
        </ConfirmModal>
      )}
    </section>
  );
}

export default Members;
