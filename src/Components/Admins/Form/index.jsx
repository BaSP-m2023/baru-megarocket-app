import styles from './form.module.css';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import Button from '../../Shared/Button';
import ConfirmModal from '../../Shared/ConfirmModal';
import ResponseModal from '../../Shared/ResponseModal';
import { Input } from '../../Shared/Inputs';

function Form() {
  const params = useParams();
  const history = useHistory();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [messageResponse, setMessageResponse] = useState('');
  const [admins, setAdmins] = useState([]);
  const [stateModal, setStateModal] = useState('success');
  const [admin, setAdmin] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    city: '',
    password: ''
  });

  useEffect(() => {
    if (params.id) {
      getAdminsById();
    }
  }, [params.id]);

  useEffect(() => {
    setAdmin({
      firstName: admins.firstName,
      lastName: admins.lastName,
      dni: '',
      phone: '',
      email: '',
      city: '',
      password: ''
    });
  }, [admins]);

  const getAdminsById = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${params.id}`);
      const res = await response.json();
      const body = res.data;
      setAdmins(body);
    } catch (error) {
      setMessageResponse(`Error fetching admins: ${error.message}`);
      setShowResponseModal(true);
    }
  };

  const editAdmin = async (idToUpdate, adminToUpdate) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${idToUpdate}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          firstName: adminToUpdate.firstName,
          lastName: adminToUpdate.lastName,
          dni: Number(adminToUpdate.dni),
          phone: Number(adminToUpdate.phone),
          email: adminToUpdate.email,
          city: adminToUpdate.city,
          password: adminToUpdate.password
        })
      });
      if (response.ok) {
        setStateModal('success');
        setMessageResponse('Admin updated');
        setShowResponseModal(true);
      } else {
        setStateModal('fail');
        setMessageResponse('Admin could be not updated');
        setShowResponseModal(true);
      }
    } catch (error) {
      setShowResponseModal(true);
      setMessageResponse(`Error updating admins: ${error.message}`);
    }
  };

  const addAdmin = async (adminToAdd) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(adminToAdd)
      });
      if (response.ok) {
        setStateModal('success');
        setMessageResponse('Admin created');
        setShowResponseModal(true);
        setTimeout(() => {
          setShowResponseModal(false);
          history.push('/admins');
        }, 1500);
      } else {
        setStateModal('fail');
        setMessageResponse('Admin could be not created');
        setShowResponseModal(true);
      }
    } catch (error) {
      setMessageResponse(`Error adding admins: ${error.message}`);
      setShowResponseModal(true);
    }
  };

  const onChangeInput = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value
    });
    console.log(admin);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (params.id) {
      editAdmin(params.id, admin);
    } else {
      addAdmin(admin);
    }
  };

  const handleButton = () => {
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const closeResponseModal = () => {
    setShowResponseModal(false);
  };

  const handleSubmit = (e) => {
    onSubmit(e);
    setShowConfirmModal(false);
  };

  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>{params.id ? 'Edit Admin' : 'Add admin'}</h2>
        </div>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.labelInput}>
            <Input
              labelText="First Name"
              name="firstName"
              type="text"
              value={admin.firstName}
              change={onChangeInput}
            />
          </div>
          <div className={styles.labelInput}>
            <Input
              labelText="Last Name"
              name="lastName"
              type="text"
              value={admin.lastName}
              change={onChangeInput}
            />
          </div>
          <div className={styles.labelInput}>
            <Input
              labelText="DNI"
              name="dni"
              type="text"
              value={admin.dni}
              change={onChangeInput}
            />
          </div>
          <div className={styles.labelInput}>
            <Input
              labelText="Phone"
              name="phone"
              type="text"
              value={admin.phone}
              change={onChangeInput}
            />
          </div>
          <div className={styles.labelInput}>
            <Input
              labelText="City"
              name="city"
              type="text"
              value={admin.city}
              change={onChangeInput}
            />
          </div>
          <div className={styles.labelInput}>
            <Input
              labelText="Email"
              name="email"
              type="text"
              value={admin.email}
              change={onChangeInput}
            />
          </div>
          <div className={styles.labelInput}>
            <Input
              labelText="Password"
              name="password"
              type="password"
              value={admin.password}
              change={onChangeInput}
            />
          </div>
        </form>
        <div className={styles.buttonContainer}>
          <Link to="/admins">
            <Button classNameButton="cancelButton" text="Cancel"></Button>
          </Link>
          <Button action={handleButton} classNameButton="submitButton" text="Submit"></Button>
        </div>
      </div>
      {showConfirmModal && (
        <ConfirmModal
          handler={() => closeConfirmModal()}
          title={params.id ? 'Update Admin' : 'Add admin'}
          reason="submit"
          onAction={handleSubmit}
        >
          Are you sure to {params.id ? 'update' : 'add'} admin?
        </ConfirmModal>
      )}
      {showResponseModal && (
        <ResponseModal
          handler={() => closeResponseModal()}
          state={stateModal}
          message={messageResponse}
        />
      )}
    </>
  );
}

export default Form;
