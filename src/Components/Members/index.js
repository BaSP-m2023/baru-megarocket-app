import { useEffect, useState } from 'react';
import styles from './members.module.css';
import Table from './Table';
import MemberModal from './Form';

function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/member`)
      .then((response) => response.json())
      .then((response) => {
        setMembers(response.data);
      });
  }, []);

  const addMember = async (member) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/member`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(member)
    });
    const data = await res.json();

    setMembers([...members, data]);
  };

  const [isOpenAdd, setIsOpenAdd] = useState(false);

  return (
    <section className={styles.container}>
      <h2>Members</h2>
      <button onClick={() => setIsOpenAdd(true)}>Add Member</button>
      {isOpenAdd && <MemberModal onClose={() => setIsOpenAdd(false)} addMember={addMember} />}
      <Table data={members} />
    </section>
  );
}

export default Members;
