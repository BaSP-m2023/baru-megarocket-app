import styles from './createModal.module.css';

export function ErrorModal({ onClose }) {
  return (
    <div onClick={onClose} className={styles.container}>
      <div className={styles.modal}>
        <h3 className={styles.modalError}>Subscription Not Created!</h3>
        <p>An error has occurred</p>
        <div className={styles.btnError}>
          <button>Close</button>
        </div>
      </div>
    </div>
  );
}

export function ConfirmDeleteModal({ onClose, confirmDelete }) {
  return (
    <div onClick={onClose} className={styles.container}>
      <div className={styles.modal}>
        <h3 className={styles.modalError}>Confirm Delete</h3>
        <p>Are you sure you want to delete this subscription?</p>
        <div className={styles.btnContainer}>
          <button className={styles.btnCancel} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.btnDelete} onClick={confirmDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export function DeleteModal({ onClose }) {
  return (
    <div onClick={onClose} className={styles.container}>
      <div className={styles.modal}>
        <h3>Delete Subscription</h3>
        <p>Subscription has been deleted</p>
        <div className={styles.btnContainer}>
          <button className={styles.btnCancel} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function EmptyEdit({ onClose }) {
  return (
    <div onClick={onClose} className={styles.container}>
      <div className={styles.modal}>
        <h3 className={styles.modalError}>Edit Subscription</h3>
        <p>You have to choose at least one field</p>
        <div className={styles.btnError}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export function SubscriptionEditedModal({ onClose }) {
  return (
    <div onClick={onClose} className={styles.container}>
      <div className={styles.modal}>
        <h3>Subscription Edited</h3>
        <p>Subscription has been Edited</p>
        <div className={styles.btnEdit}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export function ErrorEdit({ onClose }) {
  return (
    <div onClick={onClose} className={styles.container}>
      <div className={styles.modal}>
        <h3 className={styles.modalError}>Error Edit Subscription</h3>
        <p>Error editing subscription</p>
        <div className={styles.btnError}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
