import styles from './toast.module.css';

const Toast = ({ handler, msg, classes }) => {
  return (
    <div className={`${styles.toast} ${styles[classes]}`}>
      <p className={`${styles['toast-content']}`}>
        {msg}{' '}
        <span className={`${styles['toast-closer']}`} onClick={handler}>
          &times;
        </span>
      </p>
    </div>
  );
};

export default Toast;
