import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styles from './form.module.css';
import Button from '../../Shared/Button';
import { Input } from '../../Shared/Inputs';
import ConfirmModal from '../../Shared/ConfirmModal';
import ResponseModal from '../../Shared/ResponseModal';
import { useDispatch, useSelector } from 'react-redux';
import { addSuperadmin, editSuperadmin, getSuperadmins } from '../../../Redux/SuperAdmins/thunks';
import { handleDisplayToast } from '../../../Redux/Shared/ResponseToast/actions';

const SuperAdminsForm = () => {
  const [showConfirmAdd, setShowConfirmAdd] = useState(false);
  const [showConfirmEdit, setShowConfirmEdit] = useState(false);
  const [superadmin, setSuperadmin] = useState({});
  const { show, message, state } = useSelector((state) => state.toast);
  const superadmins = useSelector((state) => state.superadmins.superadmins);
  const dispatch = useDispatch();

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getSuperadmins(dispatch);
  }, [dispatch]);

  const findById = async () => {
    const superadmin = superadmins?.find((superadmin) => superadmin._id === id) || '';
    const { name, lastName, email } = superadmin;
    setSuperadmin({ name, lastName, email });
  };

  const goBack = () => {
    history.push('/super-admins');
  };

  useEffect(() => {
    id && findById();
  }, [superadmins]);

  const onChangeInput = (e) => {
    setSuperadmin({
      ...superadmin,
      [e.target.name]: e.target.value
    });
  };

  const confirmAdd = () => {
    setShowConfirmAdd(true);
  };

  const addItem = (superadminToAdd) => {
    dispatch(addSuperadmin(superadminToAdd, goBack));
    setShowConfirmAdd(false);
  };

  const confirmEdit = () => {
    setShowConfirmEdit(true);
  };

  const putItem = (idToEdit, editedSuperadmin) => {
    dispatch(editSuperadmin(idToEdit, editedSuperadmin, goBack));
    setShowConfirmEdit(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    id ? confirmEdit() : confirmAdd();
  };

  return (
    <>
      {show && (
        <ResponseModal
          state={state}
          message={message}
          handler={() => dispatch(handleDisplayToast(false))}
        />
      )}
      {showConfirmAdd && (
        <ConfirmModal
          title={'New superadmin'}
          reason={'submit'}
          handler={() => setShowConfirmAdd(false)}
          onAction={() => addItem(superadmin)}
        >
          Are you sure you want to add this superadmin?
        </ConfirmModal>
      )}
      {showConfirmEdit && (
        <ConfirmModal
          title={'Edit superadmin'}
          reason={'submit'}
          handler={() => setShowConfirmEdit(false)}
          onAction={() => putItem(id, superadmin)}
        >
          Are you sure you want to edit this superadmin?
        </ConfirmModal>
      )}
      <div className={styles.formBackground}>
        <div className={styles.container}>
          <div className={styles.titleContainer}>
            <h3 className={styles.title}>{id ? 'Edit superadmin' : 'Create superadmin'}</h3>
            <button className={styles.close} onClick={goBack}>
              X
            </button>
          </div>
          <div>
            <form className={styles.form} onSubmit={onSubmit}>
              <Input
                labelText={'Name'}
                value={superadmin.name || ''}
                name={'name'}
                change={onChangeInput}
              />
              <Input
                labelText={'Last name'}
                value={superadmin.lastName || ''}
                name={'lastName'}
                change={onChangeInput}
              />
              <Input
                labelText={'Email'}
                value={superadmin.email || ''}
                name={'email'}
                change={onChangeInput}
              />
              {!id && (
                <Input
                  labelText={'Password'}
                  value={superadmin.password || ''}
                  type={'password'}
                  name={'password'}
                  change={onChangeInput}
                />
              )}
              <Button text={'Submit'} classNameButton={'submitButton'} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminsForm;
