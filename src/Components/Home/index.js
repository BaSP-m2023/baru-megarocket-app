import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useState } from 'react';
import styles from './home.module.css';
import Button from 'Components/Shared/Button';

function Home() {
  const [login, setLogin] = useState({ isLogged: false, data: null });
  const keys = [
    '_id',
    'name',
    'lastName',
    'dni',
    'phone',
    'email',
    'city',
    'dob',
    'zip',
    'isActive',
    'membership'
  ];

  useEffect(() => {
    if (localStorage.getItem('_id')) {
      let user = [];
      keys.forEach((key) => {
        user.push({ key, value: localStorage.getItem(key) });
      });
      setLogin({ isLogged: true, data: user });
      return;
    }
  }, []);

  const handleLogout = () => {
    keys.forEach((key) => {
      localStorage.removeItem(key);
      setLogin({ isLogged: false, data: null });
    });
  };

  return (
    <>
      {login.isLogged && <p onClick={handleLogout}>Logout</p>}
      <section className={styles.container}>
        <h2>Home</h2>
        <div className={styles.buttonContainer}>
          <Link to="/signup">
            <Button text="SignUp" />
          </Link>
          <Link to="/login">
            <Button text="Login" />
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
