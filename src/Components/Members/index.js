import { useEffect, useState } from 'react';
import styles from './members.module.css';
import Table from './Table';
import MemberModal from './Form';
import MessageModal from './Modal';

function Members() {
  const [members, setMembers] = useState([]);

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
    } else {
      console.log('error');
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
      setModalMessageOpen(true);
      handleClose();
    } else {
      console.log('error');
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  console.log(modalMessageOpen);

  const handleShow = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
    setEditMember(null);
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
      <Table data={members} editMember={handleEdit} />
      {/* {modalMessageOpen && <MessageModal />} */}
      <MessageModal />
    </section>
  );
}

export default Members;
