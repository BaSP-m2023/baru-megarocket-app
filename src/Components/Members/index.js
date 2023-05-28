import { useEffect, useState } from 'react';
import styles from './members.module.css';
import Table from '../Table';
import AddMemberModal from '../Form';

function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/member/`)
      .then((response) => response.json())
      .then((response) => {
        setMembers(response.data);
      });
  }, []);

  const addMember = async (member) => {
    // const newMeber = { ...member };
    // setMembers([...members, newMeber]);
    const res = await fetch(`http://localhost:4000/api/member/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(member)
    });
    const data = await res.json();

    setMembers([...members, data]);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={styles.container}>
      <h2>Members</h2>
      <button onClick={() => setIsOpen(true)}>Add Member</button>
      <AddMemberModal open={isOpen} onClose={() => setIsOpen(false)} addMember={addMember} />
      <Table data={members} />
    </section>
  );
}

export default Members;
