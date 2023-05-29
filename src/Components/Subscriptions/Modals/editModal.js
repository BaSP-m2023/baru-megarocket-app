import styles from './EditModal.module.css';

function Modal(props) {
  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Edit Subscription</h3>
        <p>Subscription has been edited</p>
        <div className={styles.btnEdit}>
          <button onClick={props.closeModal}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
