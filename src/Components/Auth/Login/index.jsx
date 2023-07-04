import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './login.module.css';

import { login } from 'Redux/Auth/thunks';
import loginSchema from 'Validations/login';

import { Input } from 'Components/Shared/Inputs';
import Button from 'Components/Shared/Button';

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleLogin = (data) => {
    dispatch(login(data, history));
  };
  return (
    <section className={styles.formContainer}>
      <form className={styles.form}>
        <div className={styles.titleContainer} data-testid="login-title-container">
          <h2 className={styles.h2}>MegaRocket</h2>
          <h3 className={styles.h3}>Login</h3>
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
        <div className={styles.inputContainer} data-testid="login-password-container">
          <Input
            labelText="Password"
            type="password"
            name="password"
            placeholder="Password"
            register={register}
            error={errors.password?.message}
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
