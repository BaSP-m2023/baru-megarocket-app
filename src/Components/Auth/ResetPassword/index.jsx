import { Link, useLocation, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import styles from './resetPassword.module.css';
import { getAuth, confirmPasswordReset } from 'firebase/auth';

import { joiResolver } from '@hookform/resolvers/joi';
import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';
import newPasswordSchema from 'Validations/newPassword';

import Button from 'Components/Shared/Button';
import { Input } from 'Components/Shared/Inputs';

const NewPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(newPasswordSchema),
    defaultValues: {
      password: ''
    }
  });

  function useQuery() {
    const location = useLocation();
    return new URLSearchParams(location.search);
  }

  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();

  const handleNewPass = (data) => {
    const auth = getAuth();
    const newPassword = data.password;
    confirmPasswordReset(auth, query.get('oobCode'), newPassword)
      .then(() => {
        history.push('/auth/login');
        dispatch(setContentToast({ message: 'Password reset successfully', state: 'success' }));
        dispatch(handleDisplayToast(true));
      })
      .catch(() => {
        dispatch(setContentToast({ message: 'Password is required', state: 'fail' }));
        dispatch(handleDisplayToast(true));
      });
  };

  return (
    <section className={styles.formContainer}>
      <form className={styles.form}>
        <div className={styles.titleContainer} data-testid="login-title-container">
          <h2 className={styles.h2}>MegaRocket</h2>
        </div>
        <div className={styles.inputContainer} data-testid="login-password-container">
          <Input
            labelText="New Password"
            type="password"
            name="password"
            placeholder="Password"
            register={register}
            error={errors.password?.message}
          />
        </div>
        <div className={styles.buttonContainer} data-testid="login-form-buttons-container">
          <Button
            action={handleSubmit(handleNewPass)}
            text="Continue"
            classNameButton="submitButton"
          />
          <Link to="/">
            <Button text="Home" classNameButton="cancelButton" />
          </Link>
        </div>
      </form>
    </section>
  );
};

export default NewPassword;
