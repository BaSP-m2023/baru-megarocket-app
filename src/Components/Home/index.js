import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import styles from './home.module.css';
import Button from 'Components/Shared/Button';
import { loginMemberSuccess, logoutMember } from 'Redux/LoginMembers/actions';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
  const dispatch = useDispatch();
  const { isLogged, data } = useSelector((state) => state.loginMembers);
  console.log(data);
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
    if (localStorage.length !== 0) {
      let user = [];
      keys.forEach((key) => {
        user.push({ key, value: localStorage.getItem(key) });
      });
      dispatch(loginMemberSuccess(user));
    }
  }, []);

  const handleLogout = () => {
    keys.forEach((key) => {
      localStorage.removeItem(key);
    });
    dispatch(logoutMember());
  };

  return (
    <>
      {isLogged && <p onClick={handleLogout}>Logout</p>}
      <section className={styles.container}>
        <h2>Home</h2>
        {!isLogged && (
          <div className={styles.buttonContainer}>
            <Link to="/signup">
              <Button text="SignUp" />
            </Link>
            <Link to="/login">
              <Button text="Login" />
            </Link>
          </div>
        )}
      </section>
    </>
  );
}

export default Home;
