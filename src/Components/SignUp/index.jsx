import { Input } from 'Components/Shared/Inputs';
import styles from '../Login/login.module.css';
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
    <section className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.titleContainer}>
          <h2 className={styles.h2}>MegaRocket</h2>
          <h3 className={styles.h3}>Sign Up</h3>
        </div>
        <div>
          {formFields.map((inputData, index) => (
            <div className={styles.inputContainer} key={index}>
              <Input
                labelText={inputData.labelText}
                type={inputData.type}
                name={inputData.name}
                register={register}
                error={errors[inputData.name]?.message}
              />
            </div>
          ))}
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Membership</label>
          <select className={styles.select} name="membership" {...register('membership')}>
            <option value="default">Choose your membership</option>
            <option value="classic">Classic</option>
            <option value="only_classes">Only Classes</option>
            <option value="black">Black</option>
          </select>
        </div>
        <div className={styles.buttonContainer}>
          <Button classNameButton="addButton" text={'Sign Up'} />
          <Button classNameButton="cancelButton" text={'Home'} />
        </div>
      </form>
      {showConfirmModal && (
        <ConfirmModal
          title="Sign Up"
          handler={() => setShowConfirmModal(false)}
          onAction={handleSubmit(handleSignup)}
          reason={'submit'}
        >
          {`Are you sure you wanna edit?`}
        </ConfirmModal>
      )}
    </section>
  );
}

export default SignUp;
