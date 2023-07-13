import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import styles from './forgotPassword.module.css';

import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';

import { joiResolver } from '@hookform/resolvers/joi';
import forgotPasswordSchema from 'Validations/forgotPassword';

import { Button } from 'Components/Shared/Button';
import { Input } from 'Components/Shared/Inputs';

const ForgotPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  });

  const handleSendEmail = (data) => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        history.push('/auth/login');
        dispatch(setContentToast({ message: 'Email with reset link sent', state: 'success' }));
        dispatch(handleDisplayToast(true));
      })
      .catch(() => {
        dispatch(setContentToast({ message: 'Email is not registed', state: 'fail' }));
        dispatch(handleDisplayToast(true));
      });
  };

  return (
    <section className={styles.formContainer}>
      <form className={styles.form}>
        <div className={styles.titleContainer} data-testid="login-title-container">
          <h2 className={styles.h2}>MegaRocket</h2>
          <h3 className={styles.h3}>Send link to the following mail</h3>
        </div>
        <div className={styles.inputContainer} data-testid="login-email-container">
          <Input
            labelText="Email"
            type="email"
            placeholder="Email"
            name="email"
            register={register}
            error={errors.email?.message}
          />
        </div>
        <div className={styles.buttonContainer} data-testid="login-form-buttons-container">
          <Button
            action={handleSubmit(handleSendEmail)}
            text="Send email"
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

export default ForgotPassword;
