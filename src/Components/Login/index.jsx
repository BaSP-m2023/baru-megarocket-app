import { Input } from 'Components/Shared/Inputs';
import styles from './login.module.css';
import Button from 'Components/Shared/Button';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { loginMembers } from 'Redux/LoginMembers/thunks';

import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';
import { useForm } from 'react-hook-form';
function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { register, handleSubmit, getValues } = useForm({
    mode: 'onChange'
  });
  const handleLogin = () => {
    const inputValue = getValues().email;
    loginMembers(dispatch, inputValue)
      .then((data) => {
        // eslint-disable-next-line no-unused-vars
        const { password, __v, ...resObj } = data;
        localStorage.setItem('login', JSON.stringify(resObj));
        history.push('/');
      })
      .catch((error) => {
        dispatch(handleDisplayToast(true));
        dispatch(setContentToast({ message: error.message, state: 'fail' }));
      });
  };
  return (
    <section className={styles.formContainer}>
      <form className={styles.form}>
        <div className={styles.titleContainer} data-testid="login-title-container">
          <h2 className={styles.h2}>MegaRocket</h2>
          <h3 className={styles.h3}>Login members</h3>
        </div>
        <div className={styles.inputContainer} data-testid="login-email-container">
          <Input
            labelText="Email"
            type="email"
            placeholder="Email"
            name="email"
            register={register}
          />
        </div>
        <div className={styles.inputContainer} data-testid="login-password-container">
          <Input
            labelText="Password"
            type="password"
            name="password"
            placeholder="Password"
            register={register}
          />
        </div>
        <div className={styles.buttonContainer} data-testid="login-form-buttons-container">
          <Button action={handleSubmit(handleLogin)} text="Login" classNameButton="submitButton" />
          <Link to="/">
            <Button text="Home" classNameButton="cancelButton" />
          </Link>
        </div>
      </form>
    </section>
  );
}
export default Login;
