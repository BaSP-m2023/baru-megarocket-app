import { useEffect, useState } from 'react';
import styles from './members.module.css';

function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => response.json())
      .then((response) => {
        setMembers(response);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Members</h2>
      <div>
        {members.map((employee) => {
          return <div key={employee.id}>{employee.name}</div>;
        })}
      </div>
    </section>
  );
}

export default Members;
