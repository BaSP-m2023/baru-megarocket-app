import styles from './createModal.module.css';
export function CreateModal({ onClose }) {
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
export function ErrorModal({ onClose }) {
  return (
    <div className={styles.container}>
      <div onClick={onClose} className={styles.modal}>
        <h3 className={styles.modalError}>Subscription Not Created!</h3>
        <p>An error has occurred</p>
        <div className={styles.btnError}>
          <button>Close</button>
        </div>
      </div>
    </div>
  );
}
