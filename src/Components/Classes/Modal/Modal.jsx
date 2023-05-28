import styles from './modal.module.css';

function Modal({ showModal, onClose, error }) {
  console.log(error.msg);
  if (!showModal) return null;
  return (
    <>
      <div className={styles.modalContainer}>
        <div className={error.error ? styles.modalError : styles.modalSuccess}>
          {error.error ? (
            <p className={styles.error}>{error.msg}</p>
          ) : (
            <p className={styles.success}>Class created successfully</p>
          )}
          <button className={styles.closeModal} onClick={onClose}>
            X
          </button>
        </div>
      </div>
    </>
  );
}

export default Modal;
