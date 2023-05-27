import styles from './form.module.css';

function Form({ selectedClass }) {
  console.log(selectedClass);
  return <div className={styles.formContainer}></div>;
}

export default Form;
