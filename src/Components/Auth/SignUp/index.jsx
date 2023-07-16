import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './signup.module.css';
import Loader from 'Components/Shared/Loader';

import { signUpMember } from 'Redux/Auth/thunks';
import memberSchema from 'Validations/member';
import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';

import { Input } from 'Components/Shared/Inputs';
import { Button } from 'Components/Shared/Button';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import ResponseModal from 'Components/Shared/ResponseModal';

function SignUp() {
  const history = useHistory();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.isLoading);
  const { dark } = useSelector((state) => state.darkmode);
  const { show, message, state } = useSelector((state) => state.toast);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: joiResolver(memberSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      lastName: '',
      dni: '',
      phone: '',
      email: '',
      city: '',
      dob: '',
      isActive: false,
      membership: 'default',
      zip: '',
      password: ''
    }
  });

  useEffect(() => {
    const localStorageMembership = localStorage.getItem('membership');
    if (localStorageMembership) {
      setValue('membership', localStorageMembership);
      dispatch(
        setContentToast({
          message: `${localStorageMembership.toLocaleUpperCase()} membership selected.`,
          state: 'success'
        })
      );
      dispatch(handleDisplayToast(true));
      localStorage.removeItem('membership');
    }
  }, [setValue]);

  const handleSignup = (data) => {
    if (data) {
      dispatch(signUpMember(data, history));
      setShowConfirmModal(false);
    }
  };

  const handlePassword = () => {
    if (viewPassword) {
      setViewPassword(false);
    } else {
      setViewPassword(true);
    }
  };

  const onSubmit = () => {
    setShowConfirmModal(!showConfirmModal);
  };

  const firstFormFields = [
    { labelText: 'Name', type: 'text', name: 'name' },
    { labelText: 'Last name', type: 'text', name: 'lastName' },
    { labelText: 'DNI', type: 'number', name: 'dni' },
    { labelText: 'Phone', type: 'number', name: 'phone' },
    { labelText: 'Email', type: 'email', name: 'email' }
  ];

  const secondFormFields = [
    { labelText: 'City', type: 'text', name: 'city' },
    { labelText: 'Date of birth', type: 'date', name: 'dob' },
    { labelText: 'Zip code', type: 'number', name: 'zip' },
    { labelText: 'Password', type: 'password', name: 'password' }
  ];

  if (loading) {
    return (
      <div className={styles.container}>
        <Loader />;
      </div>
    );
  }
  return (
    <div className={!dark ? styles.signup : styles.darksignup}>
      <div className={styles.content}>
        <div className={styles.formTitle} data-testid="signup-members-header">
          <h2>Member Register</h2>
          <span className={styles.closeButton} onClick={() => history.push('/')}>
            &times;
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div data-testid="signup-members-inputs">
            <div className={styles.inputContainer}>
              <div className={styles.label_container}>
                {firstFormFields.map((inputData, index) => (
                  <Input
                    key={index}
                    labelText={inputData.labelText}
                    type={inputData.type}
                    name={inputData.name}
                    register={register}
                    error={errors[inputData.name]?.message}
                  />
                ))}
              </div>
              <div className={styles.label_container}>
                {secondFormFields.map((inputData, index) => (
                  <div
                    key={index}
                    className={
                      inputData.type === 'password' ? styles.input : styles.label_container
                    }
                  >
                    <div className={styles.label_container}>
                      <Input
                        labelText={inputData.labelText}
                        type={
                          inputData.type === 'password' && viewPassword ? 'text' : inputData.type
                        }
                        name={inputData.name}
                        register={register}
                        error={errors[inputData.name]?.message}
                      />
                    </div>
                    <div className={styles.btnVisibilityPassword}>
                      {inputData.type === 'password' && (
                        <FontAwesomeIcon
                          icon={viewPassword ? faEyeSlash : faEye}
                          onClick={handlePassword}
                          className={styles.imgButtonPassword}
                        />
                      )}
                    </div>
                  </div>
                ))}
                <div className={styles.label_container}>
                  <label className={styles.label}>Membership</label>
                  <select className={styles.select} name="membership" {...register('membership')}>
                    <option value="default">Choose your membership</option>
                    <option value="only_classes">Only Classes 34,99 U$S/month</option>
                    <option value="classic">Classic 49,99 U$S/month</option>
                    <option value="black">Black 89,99 U$S/month</option>
                  </select>
                  <span className={styles.error}>
                    {errors.membership ? (errors.message = 'Choose your membership') : '\u00A0'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.buttonContainer} data-testid="signup-members-buttons">
            <Button classNameButton="addButton" text={'Sign Up'} />
            <Button classNameButton="cancelButton" text={'Home'} action={() => history.push('/')} />
          </div>
        </form>
        {showConfirmModal && (
          <ConfirmModal
            title="Sign Up"
            handler={() => setShowConfirmModal(false)}
            onAction={handleSubmit(handleSignup)}
            reason={'submit'}
          >
            {`Are you sure you want to sign up?`}
          </ConfirmModal>
        )}
        {show && (
          <ResponseModal
            handler={() => handleDisplayToast(false)}
            message={message}
            state={state}
          />
        )}
      </div>
    </div>
  );
}

export default SignUp;
