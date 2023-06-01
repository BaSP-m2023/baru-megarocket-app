import React, { useEffect, useState } from 'react';
import styles from './members.module.css';
import Table from './Table';
import MemberModal from './Form';
import MessageModal from './Modal';

function Members() {
  const [members, setMembers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);

  const getAllMembers = async () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/member`)
      .then((response) => response.json())
      .then((response) => {
        setMembers(response.data);
      });
  };

  useEffect(() => {
    getAllMembers();
  }, []);

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

  return (
    <section className={styles.container}>
      <h2>Members</h2>
      <button onClick={() => handleShow()}>Add Member</button>
      <MemberModal
        memberId={editMember}
        data={members}
        modalOpen={modalOpen}
        onClose={() => handleClose()}
        addMember={addMember}
        updMember={updMember}
      />
      <Table data={members} handleEdit={handleEdit} />
      {modalMessageOpen && (
        <MessageModal modalMessage={modalMessage} onCloseMessage={() => handleMessageClose()} />
      )}
    </section>
  );
}

export default Members;
