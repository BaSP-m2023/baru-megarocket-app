import styles from './modal.module.css';

function Modal({ showModal, onClose, responseModal }) {
  if (!showModal) return null;
  return (
    <>
      <div className={styles.modalContainer}>
        <div className={responseModal.error ? styles.modalError : styles.modalSuccess}>
          {responseModal.error ? (
            <p className={styles.error}>{responseModal.msg}</p>
          ) : (
            <p className={styles.success}>{responseModal.msg}</p>
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
