import styles from './DeleteModal.module.css';

function DeleteModal(props) {
  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>{props.title}</h3>
        <p>{props.message}</p>
        <div className={styles.btnEdit}>
          <button onClick={props.closeModal}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
