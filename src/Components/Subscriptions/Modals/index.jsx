import styles from './createModal.module.css';
function Modal({ onClose }) {
  return (
    <div onClick={onClose} className={styles.container}>
      <div className={styles.modal}>
        <h3>Subscription Created Succesfully!</h3>
        <p>Subscription has been created</p>
        <div className={styles.btnEdit}>
          <button>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
