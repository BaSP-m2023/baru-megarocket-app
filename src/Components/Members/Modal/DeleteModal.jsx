import styles from './deletemodal.module.css';

const DeleteModal = ({ hide, onDelete, member }) => {
  return (
    <div className={`${styles.modal}`}>
      <div className={`${styles['modal-content']}`}>
        <div className={`${styles['modal-header']}`}>
          <span className={`${styles['modal-title']}`}>Delete member</span>
          <span className={`${styles['modal-close']}`} onClick={hide}>
            &times;
          </span>
        </div>
        <p className={`${styles['modal-message']}`}>
          Are you sure you want to delete <strong>{member.name}</strong>?
        </p>
        <div className={`${styles['modal-buttons']}`}>
          <button
            className={`${styles.btn} ${styles['btn-submit']}`}
            onClick={() => onDelete(member._id)}
          >
            Submit
          </button>
          <button className={`${styles.btn} ${styles['btn-cancel']}`} onClick={hide}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
