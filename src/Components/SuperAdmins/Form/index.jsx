import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styles from './form.module.css';
import Button from '../../Shared/Button';
import { Input } from '../../Shared/Inputs';
import ConfirmModal from '../../Shared/ConfirmModal';
import ResponseModal from '../../Shared/ResponseModal';

const SuperAdminsForm = () => {
  const [showConfirmAdd, setShowConfirmAdd] = useState(false);
  const [superadminToAdd, setSuperadminToAdd] = useState(null);
  const [showConfirmEdit, setShowConfirmEdit] = useState(false);
  const [idToEdit, setIdToEdit] = useState(null);
  const [editedSuperadmin, setEditedSuperadmin] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const [superadmin, setSuperadmin] = useState({});
  const history = useHistory();
  const goBackHandle = () => {
    history.goBack();
  };
  const { id } = useParams();

  const closeModal = () => {
    setshowModal(false);
  };

  const confirmAdd = async (newSuperadmin) => {
    setShowConfirmAdd(true);
    setSuperadminToAdd(newSuperadmin);
  };
  const addItem = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(superadminToAdd)
      });
      setShowConfirmAdd(false);
      goBackHandle();
      if (res.ok) {
        sessionStorage.setItem('state', 'success');
        sessionStorage.setItem('resMessage', 'New superadmin created');
      } else {
        sessionStorage.setItem('state', 'fail');
        sessionStorage.setItem('resMessage', 'Failed to create superadmin');
      }
    } catch (error) {
      sessionStorage.setItem('state', 'fail');
      sessionStorage.setItem('resMessage', 'Failed to create superadmin');
    }
  };

  const confirmEdit = (id, updatedSuperadmin) => {
    setShowConfirmEdit(true);
    setIdToEdit(id);
    setEditedSuperadmin(updatedSuperadmin);
  };
  const putItem = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${idToEdit}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedSuperadmin)
      });
      setShowConfirmEdit(false);
      goBackHandle();
      if (res.ok) {
        sessionStorage.setItem('state', 'success');
        sessionStorage.setItem('resMessage', 'Superadmin edited');
      } else {
        sessionStorage.setItem('state', 'fail');
        sessionStorage.setItem('resMessage', 'Failed to edit superadmin');
      }
    } catch (error) {
      sessionStorage.setItem('state', 'fail');
      sessionStorage.setItem('resMessage', 'Failed to edit superadmin');
    }
  };

  const getItemById = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
      method: 'GET'
    });
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

  const onSubmit = async (e) => {
    e.preventDefault();
    id ? confirmEdit(id, superadmin) : confirmAdd(superadmin);
  };

  return (
    <>
      {showModal && <ResponseModal handler={closeModal} />}
      {showConfirmAdd && (
        <ConfirmModal
          title={'New superadmin'}
          reason={'submit'}
          handler={() => setShowConfirmAdd(false)}
          onAction={addItem}
        >
          Are you sure you want to add this superadmin?
        </ConfirmModal>
      )}
      {showConfirmEdit && (
        <ConfirmModal
          title={'Edit superadmin'}
          reason={'submit'}
          handler={() => setShowConfirmEdit(false)}
          onAction={putItem}
        >
          Are you sure you want to edit this superadmin?
        </ConfirmModal>
      )}
      <div className={styles.formBackground}>
        <div className={styles.container}>
          <div className={styles.modalTitle}>
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
