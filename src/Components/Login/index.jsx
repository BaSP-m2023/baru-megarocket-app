import { Input } from 'Components/Shared/Inputs';
import styles from './login.module.css';
import Button from 'Components/Shared/Button';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { loginMembers } from 'Redux/LoginMembers/thunks';

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginMembers(dispatch)
      .then((data) => {
        // eslint-disable-next-line no-unused-vars
        const { password, __v, ...resObj } = data;
        localStorage.setItem('isLogged', true);
        Object.entries(resObj).every(([key, value]) => {
          localStorage.setItem(key, value);
          return true;
        });
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className={styles.formContainer}>
      <form className={styles.form}>
        <h2>MegaRocket</h2>
        <h3>Login</h3>
        <div className={styles.inputContainer}>
          <Input labelText="Email" type="email" placeholder="Email" name="email" />
        </div>
        <div className={styles.inputContainer}>
          <Input labelText="Password" type="password" name="password" placeholder="Password" />
        </div>
        <div className={styles.inputContainer}>
          <Button action={handleLogin} text="Login" classNameButton="submitButton" />
          <Link to="/">
            <Button text="Cancel" classNameButton="cancelButton" />
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Login;
