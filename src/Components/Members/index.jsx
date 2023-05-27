import { useEffect, useState } from 'react';
import styles from './members.module.css';

import List from './List';

function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getMembers = async () => {
      const membersFromDb = await getAllMembers();
      setMembers(membersFromDb);
    };
    getMembers();
  }, []);

  const getAllMembers = async () => {
    const res = await fetch(`${process.env.REACT_APP_URL_API}/api/member`);
    const { data } = await res.json();
    return data;
  };

  return (
    <section className={styles.container}>
      <List members={members} />
    </section>
  );
}

export default Members;
