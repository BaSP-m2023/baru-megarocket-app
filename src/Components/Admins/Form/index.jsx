import styles from './form.module.css';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function Form({ title, addAdmin, editAdmin, idToUpdate, admins }) {
  const history = useHistory();
  const params = useParams();
  const handleButton = () => {
    history.push('/admins');
  };

  const [admin, setAdmin] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    city: '',
    password: ''
  });

  useEffect(() => {
    if (params.id) {
      let adminToUpdate = admins.filter((admin) => params.id === admin._id);
      adminToUpdate = adminToUpdate[0];
      const keyAdmins = {
        firstName: adminToUpdate.firstName,
        lastName: adminToUpdate.lastName,
        dni: adminToUpdate.dni,
        phone: adminToUpdate.phone,
        email: adminToUpdate.email,
        city: adminToUpdate.city,
        password: adminToUpdate.password
      };
      setAdmin(keyAdmins);
    }
  }, []);

  const onChangeInput = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (idToUpdate) {
      editAdmin(idToUpdate, admin);
    } else {
      addAdmin(admin);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button onClick={handleButton} className={styles.button}>
            X
          </button>
        </div>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.labelInput}>
            <label className={styles.label} htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName"
              className={styles.input}
              name="firstName"
              type="text"
              value={admin.firstName}
              onChange={onChangeInput}
            />
          </div>
          <div className={styles.labelInput}>
            <label className={styles.label} htmlFor="lastName">
              Last Name
            </label>
            <input
              id="lastName"
              className={styles.input}
              name="lastName"
              type="text"
              value={admin.lastName}
              onChange={onChangeInput}
            />
          </div>
          <div className={styles.labelInput}>
            <label className={styles.label} htmlFor="dni">
              DNI
            </label>
            <input
              id="dni"
              className={styles.input}
              name="dni"
              type="text"
              value={admin.dni}
              onChange={onChangeInput}
            />
          </div>
          <div className={styles.labelInput}>
            <label className={styles.label} htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              className={styles.input}
              name="phone"
              type="text"
              value={admin.phone}
              onChange={onChangeInput}
            />
          </div>
          <div className={styles.labelInput}>
            <label className={styles.label} htmlFor="city">
              City
            </label>
            <input
              id="city"
              className={styles.input}
              name="city"
              type="text"
              value={admin.city}
              onChange={onChangeInput}
            />
          </div>
          <div className={styles.labelInput}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className={styles.input}
              name="email"
              type="text"
              value={admin.email}
              onChange={onChangeInput}
            />
          </div>
          <div className={styles.labelInput}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className={styles.input}
              name="password"
              type="password"
              value={admin.password}
              onChange={onChangeInput}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={handleButton} className={styles.cancelButton}>
              Cancel
            </button>
            <button className={styles.addCreateButton} type="submit">
              {title}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
