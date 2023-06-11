/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styles from './form.module.css';
import Button from '../../Shared/Button';
import { Input } from '../../Shared/Inputs';
import ConfirmModal from '../../Shared/ConfirmModal';
import ResponseModal from '../../Shared/ResponseModal';
import { useDispatch, useSelector } from 'react-redux';
import { addSuperadmin, editSuperadmin } from '../../../Redux/SuperAdmins/thunks';
import { closeMessage } from '../../../Redux/SuperAdmins/actions';

const SuperAdminsForm = () => {
  const [showConfirmAdd, setShowConfirmAdd] = useState(false);
  const [showConfirmEdit, setShowConfirmEdit] = useState(false);
  const [superadmin, setSuperadmin] = useState({});

  const dispatch = useDispatch();
  const resState = useSelector((state) => state.superadmins.resState);
  const resMessage = useSelector((state) => state.superadmins.resMessage);
  var showMessage = useSelector((state) => state.superadmins.showMessage);

  const history = useHistory();
  const goBackHandle = () => {
    history.goBack();
  };
  const { id } = useParams();

  const getItemById = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`);
    const data = await res.json();
    const updatingItem = data.data;
    const { name, lastName, email } = updatingItem;
    setSuperadmin({
      name,
      lastName,
      email
    });
  };

  useEffect(() => {
    id && getItemById();
  }, []);

  const onChangeInput = (e) => {
    setSuperadmin({
      ...superadmin,
      [e.target.name]: e.target.value
    });
  };

  const closeModal = () => {
    dispatch(closeMessage());
  };

  const confirmAdd = () => {
    setShowConfirmAdd(true);
  };

  const addItem = (superadminToAdd) => {
    dispatch(addSuperadmin(superadminToAdd));
    setShowConfirmAdd(false);
    goBackHandle();
  };
  //console.log(resState == 'success');

  const confirmEdit = () => {
    setShowConfirmEdit(true);
  };

  const putItem = (idToEdit, editedSuperadmin) => {
    dispatch(editSuperadmin(idToEdit, editedSuperadmin));
    setShowConfirmAdd(false);
    goBackHandle();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    id ? confirmEdit() : confirmAdd();
  };

  return (
    <>
      {showMessage && <ResponseModal handler={closeModal} state={resState} message={resMessage} />}
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
            <button className={styles.close} onClick={goBackHandle}>
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
