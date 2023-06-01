import React, { useEffect, useState } from 'react';
import styles from './members.module.css';
import MemberModal from './Form';
import MessageModal from './Modal';
import List from './Table/List';
import DeleteModal from './Modal/DeleteModal';
import Toast from './Toast/Toast';

function Members() {
  const [members, setMembers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);
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

  // const getMember = async (id) => {
  //   try {
  //     const res = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`);
  //     const { data } = await res.json();
  //     setMember(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const addMember = async (member) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/member`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(member)
    });
    if (res.status === 201) {
      const data = await res.json();
      setMembers([...members, data]);
      setModalMessageOpen(true);
      setModalMessage('Member created succesfuly!');
    } else {
      setModalMessageOpen(true);
      setModalMessage('Member cant be created');
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

  const updMember = async (id, updatedMember) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedMember)
    });
    if (res.status === 200) {
      getAllMembers();
      setEditMember(null);
      setModalOpen(false);
      setModalMessageOpen(true);
      setModalMessage('Member updated succesfuly!');
    } else {
      setModalMessageOpen(true);
      setModalMessage('Cant update member!');
    }
  };

  const handleShow = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
    setEditMember(null);
  };

  const handleMessageClose = () => {
    setModalMessageOpen(false);
  };

  const handleEdit = (id) => {
    setEditMember(id);
    setModalOpen(true);
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
        <List members={members} handleModal={handleModal} handleEdit={handleEdit} />
      ) : (
        'There are not members yet :('
      )}
      <button onClick={() => handleShow()}>Add Member</button>
      <MemberModal
        memberId={editMember}
        data={members}
        modalOpen={modalOpen}
        onClose={() => handleClose()}
        addMember={addMember}
        updMember={updMember}
      />
      {modal && <DeleteModal hide={handleModal} onDelete={deleteMember} member={memberToDelete} />}
      {toast && (
        <Toast
          handler={handleToast}
          content={toastContent.content}
          classes={toastContent.className}
        />
      )}
      {modalMessageOpen && (
        <MessageModal modalMessage={modalMessage} onCloseMessage={() => handleMessageClose()} />
      )}
    </section>
  );
}

export default Members;
