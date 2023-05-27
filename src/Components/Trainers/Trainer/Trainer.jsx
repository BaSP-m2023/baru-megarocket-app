import React from 'react';
import styles from './trainer.module.css';

const Trainer = ({ trainer }) => {
  return (
    <tr>
      <td className={styles.align}>{trainer.firstName}</td>
      <td className={styles.align}>{trainer.lastName}</td>
      <td className={styles.align}>{trainer.dni}</td>
      <td className={styles.align}>{trainer.phone}</td>
      <td className={styles.align}>{trainer.email}</td>
      <td className={styles.align}>{trainer.salary}</td>
      <td className={styles.edit}>Edit</td>
      <td className={styles.delete}>&times;</td>
    </tr>
  );
};

export default Trainer;
