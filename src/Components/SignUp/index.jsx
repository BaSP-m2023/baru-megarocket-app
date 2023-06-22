import { Input } from 'Components/Shared/Inputs';
import styles from './signup.module.css';
import Button from 'Components/Shared/Button';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { addMember } from 'Redux/Members/thunks';
import memberSchema from 'Validations/member';

function SignUp() {
  const history = useHistory();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
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

  const handleSignup = (data) => {
    if (data) {
      addMember(dispatch, data);
      history.push('/');
    }
  };

  const onSubmit = () => {
    setShowConfirmModal(!showConfirmModal);
  };

  const formFields = [
    { labelText: 'Name', type: 'text', name: 'name' },
    { labelText: 'LastName', type: 'text', name: 'lastName' },
    { labelText: 'DNI', type: 'number', name: 'dni' },
    { labelText: 'Phone', type: 'text', name: 'phone' },
    { labelText: 'Email', type: 'email', name: 'email' },
    { labelText: 'City', type: 'text', name: 'city' },
    { labelText: 'Date of birth', type: 'text', name: 'dob' },
    { labelText: 'Zip code', type: 'number', name: 'zip' },
    { labelText: 'Password', type: 'password', name: 'password' }
  ];

  return (
    <div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>Member Register</h2>
          <span className={styles.close_button} onClick={() => history.push('/')}>
            &times;
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.body}>
          <div>
            {formFields.map((inputData, index) => (
              <div className={styles.label_container} key={index}>
                <Input
                  labelText={inputData.labelText}
                  type={inputData.type}
                  name={inputData.name}
                  register={register}
                  error={errors[inputData.name]?.message}
                />
              </div>
            ))}
            <div className={styles.label_container}>
              <label className={styles.label}>Membership</label>
              <select className={styles.select} name="membership" {...register('membership')}>
                <option value="default">Choose your membership</option>
                <option value="classic">Classic</option>
                <option value="only_classes">Only Classes</option>
                <option value="black">Black</option>
              </select>
              {errors.membership && <p className={styles.error}>Choose your membership</p>}
            </div>
          </div>

          <div className={styles.buttonContainer}>
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
      </div>
    </div>
  );
}

export default SignUp;
