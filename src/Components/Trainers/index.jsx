import React, { useEffect, useState } from 'react';
import styles from './trainers.module.css';
import Table from './Table/Table';

const Trainers = () => {
  const [trainers, setTrainer] = useState([]);

  useEffect(() => {
    const getTrainers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`);
        const { data } = await response.json();
        setTrainer(data);
      } catch (error) {
        console.log('Error fetching trainers:', error);
      }
    };

    getTrainers();
  }, []);

  const activeTrainers = trainers.filter((trainer) => trainer.isActive);

  return (
    <section className={styles.container}>
      <h2>Trainers</h2>
      <Table data={activeTrainers} />
    </section>
  );
};

export default Trainers;
