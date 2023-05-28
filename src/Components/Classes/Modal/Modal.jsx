import styles from './modal.module.css';

function Modal({ showModal, onClose, error }) {
  if (!showModal) return null;
  return (
    <>
      <div className={styles.modalContainer}>
        <div className={error ? styles.modalError : styles.modalSuccess}>
          {error ? (
            <p className={styles.error}>Hi</p>
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
