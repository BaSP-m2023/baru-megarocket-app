import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Link, useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './login.module.css';

import { login } from 'Redux/Auth/thunks';
import loginSchema from 'Validations/login';

import { Input } from 'Components/Shared/Inputs';
import { Button } from 'Components/Shared/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const { dark } = useSelector((state) => state.darkmode);
  const [showPassword, setShowPassword] = useState(false);

  const memberData = location.state?.email;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  useEffect(() => {
    if (memberData) {
      setValue('email', memberData);
    }
  }, [memberData, setValue]);

  const handlePassword = () => {
    if (!showPassword) {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
  };

  const handleLogin = (data) => {
    dispatch(login(data, history));
  };
  return (
    <section className={styles.formContainer}>
      <form className={!dark ? styles.form : styles.darkForm}>
        <div className={styles.titleContainer} data-testid="login-title-container">
          <h2 className={!dark ? styles.h2 : styles.darkh2}>MegaRocket</h2>
          <h3 className={!dark ? styles.h3 : styles.darkh3}>Login</h3>
        </div>
        <div className={styles.inputContainerEmail} data-testid="login-email-container">
          <Input
            labelText="Email"
            type="email"
            placeholder="Email"
            name="email"
            register={register}
            error={errors.email?.message}
          />
        </div>
        <div className={styles.containerPassword}>
          <div className={styles.inputContainerPassword}>
            <Input
              labelText="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              register={register}
              error={errors.password?.message}
            />
          </div>
          <div className={styles.buttonVisibilityPassword}>
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={handlePassword}
              size="l"
              className={styles.imgButtonPassword}
            />
          </div>
        </div>
        <div>
          <Link to="/auth/forgotPassword">
            <a href="#">Have you forgotten your password?</a>
          </Link>
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
