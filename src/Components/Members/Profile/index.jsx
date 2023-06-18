import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from 'Components/Members/Profile/profile.module.css';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import ResponseModal from 'Components/Shared/ResponseModal';
import Button from 'Components/Shared/Button';
import { Input } from 'Components/Shared/Inputs';
import { updateMember, getMembers } from 'Redux/Members/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';
import { useForm } from 'react-hook-form';
import memberSchema from 'Validations/member';
import { joiResolver } from '@hookform/resolvers/joi';

function MemberProfile({ match }) {
  const [disableEdit, setDisableEdit] = useState(true);
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const history = useHistory();
  const memberId = match.params.id;
  const dispatch = useDispatch();
  const { show, message, state } = useSelector((state) => state.toast);
  const { data } = useSelector((state) => state.members);
  const memberLogged = data.find((item) => item._id === memberId);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(memberSchema),
    defaultValues: {
      name: '',
      lastName: '',
      dni: '',
      phone: '',
      email: '',
      city: '',
      dob: '',
      zip: '',
      isActive: '',
      membership: 'default',
      password: ''
    }
  });

  console.log(handleSubmit, reset, setValue, errors);

  useEffect(() => {
    getMembers(dispatch);
  }, [dispatch]);

  const [member, setMember] = useState({
    name: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    city: '',
    dob: '',
    zip: '',
    password: ''
  });
  /*     setMember({
        name: memberLogged?.name || '',
        lastName: memberLogged?.lastName || '',
        dni: memberLogged?.dni || '',
        phone: memberLogged?.phone || '',
        email: memberLogged?.email || '',
        city: memberLogged?.city || '',
        dob: memberLogged?.dob || '',
        zip: memberLogged?.zip || '',
        password: memberLogged?.password || ''
      }); */

  useEffect(() => {
    Object.entries(memberLogged).every(([key, value]) => {
      console.log(key, value);
    });
  }, [memberLogged]);

  const onChangeInput = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
      isActive: e.currentTarget.checked
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (memberId) {
      setModalMessageOpen(false);
      updateMember(dispatch, memberId, member)
        .then((data) => {
          if (data) {
            Object.entries(data).every(([key, value]) => {
              localStorage.setItem(key, value);
              history.push('/');
              return true;
            });
          }
        })
        .catch((error) => {
          dispatch(setContentToast({ message: error.message, state: 'fail' }));
          dispatch(handleDisplayToast(true));
        });
    }
  };

  const handleEnableEdit = () => {
    setDisableEdit(false);
  };

  const handleDisableEdit = () => {
    setDisableEdit(true);
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
    <div className={styles.form}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>{memberId ? 'Edit a member' : 'Create a new member'}</h2>
          {disableEdit && (
            <Button
              classNameButton="addButton"
              action={handleEnableEdit}
              img={`${process.env.PUBLIC_URL}/assets/images/edit-icon-white.png`}
            />
          )}
          {!disableEdit && (
            <button className={styles.close_button} onClick={handleDisableEdit}>
              &times;
            </button>
          )}
        </div>
        <form className={styles.body}>
          <div>
            {formFields.map((inputData, index) => (
              <div className={styles.label_container} key={index}>
                <Input
                  labelText={inputData.labelText}
                  type={inputData.type}
                  name={inputData.name}
                  value={member[inputData.name]}
                  change={onChangeInput}
                  disabled={disableEdit}
                  register={register}
                />
              </div>
            ))}
          </div>
        </form>
        <div className={styles.confirm_button}>
          <Button
            classNameButton="addButton"
            action={() => setModalMessageOpen(true)}
            text={'Edit'}
            disabled={disableEdit}
          />
        </div>
      </div>
      {modalMessageOpen && (
        <ConfirmModal
          title={memberId ? 'Edit member' : 'Add Member'}
          handler={() => setModalMessageOpen(false)}
          onAction={onSubmit}
          reason={'submit'}
        >
          {`Are you sure you wanna edit ${member.name}?`}
        </ConfirmModal>
      )}
      {show && (
        <ResponseModal
          handler={() => dispatch(handleDisplayToast(false))}
          state={state}
          message={message}
        />
      )}
    </div>
  );
}

export default MemberProfile;
