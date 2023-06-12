import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './form.module.css';
import ConfirmModal from '../../Shared/ConfirmModal';
import ResponseModal from '../../Shared/ResponseModal';
import Button from '../../Shared/Button';
import { Input } from '../../Shared/Inputs';
import { addMember, updateMember } from '../../../Redux/Members/thunks';
import { useDispatch, useSelector } from 'react-redux';

const MemberForm = ({ match }) => {
  const [editMember, setEditMember] = useState({});
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [stateToast, setStateToast] = useState('');
  const [messageToast, setMessageToast] = useState('');
  const history = useHistory();
  let memberId = match.params.id;

  const [member, setMember] = useState({
    name: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    city: '',
    dob: '',
    zip: '',
    isActive: false,
    membership: '',
    password: ''
  });

  // const addMember = async (member) => {
  //   const res = await fetch(`${process.env.REACT_APP_API_URL}/api/member`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify(member)
  //   });
  //   if (res.status === 201) {
  //     const data = await res.json();
  //     setMembers([...members, data]);
  //     setModalMessageOpen(false);
  //     handleToast(true, 'success', 'Member added');
  //     setTimeout(() => {
  //       history.push('/members');
  //       handleShowToast(false);
  //     }, 1500);
  //   } else {
  //     setModalMessageOpen(false);
  //     handleToast(true, 'fail', 'Member cant be added');
  //     setTimeout(() => {
  //       handleShowToast(false);
  //     }, 1500);
  //   }
  // };

  // const updMember = async (id, updatedMember) => {
  //   const res = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(updatedMember)
  //   });
  //   if (res.status === 200) {
  //     setEditMember({});
  //     setModalMessageOpen(false);
  //     handleToast(true, 'success', 'Member edited');
  //     setTimeout(() => {
  //       history.push('/members');
  //       handleShowToast(false);
  //     }, 1500);
  //   } else {
  //     setModalMessageOpen(false);
  //     handleToast(true, 'fail', 'Member cant be edited');
  //     setTimeout(() => {
  //       handleShowToast(false);
  //     }, 1500);
  //   }
  // };

  useEffect(() => {
    const getMember = async (id) => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`);
        const { data } = await res.json();
        setMember({
          name: data.name,
          lastName: data.lastName,
          dni: data.dni,
          phone: data.phone,
          email: data.email,
          city: data.city,
          dob: data.dob,
          zip: data.zip,
          isActive: data.isActive,
          membership: data.membership,
          password: data.password
        });
      } catch (error) {
        handleToast(true, 'fail', error.message);
        setTimeout(() => {
          handleShowToast(false);
        }, 1500);
      }
    };
    if (memberId) {
      getMember(memberId);
      setEditMember(member);
      let newEdit = {
        name: editMember.name,
        lastName: editMember.lastName,
        dni: editMember.dni,
        phone: editMember.phone,
        email: editMember.email,
        city: editMember.city,
        dob: editMember.dob,
        zip: editMember.zip,
        isActive: editMember.isActive,
        membership: editMember.membership,
        password: editMember.password
      };
      setMember(newEdit);
    }
  }, []);

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
      updateMember(dispatch, memberId, member);
    } else {
      addMember(dispatch, member);
    }
  };

  const handleShowToast = (show) => {
    setShowToast(show);
  };

  const handleToast = (show, state, message) => {
    handleShowToast(show);
    setStateToast(state);
    setMessageToast(message);
  };

  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.data);

  console.log(members);

  return (
    <div className={styles.form}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>{memberId ? 'Edit a member' : 'Create a new member'}</h2>
          <span className={styles.close_button} onClick={() => history.push('/members')}>
            &times;
          </span>
        </div>
        <form className={styles.body}>
          <div className={styles.label_container}>
            <Input
              labelText="Name"
              type="text"
              name="name"
              value={member.name}
              change={onChangeInput}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="LastName"
              type="text"
              name="lastName"
              value={member.lastName}
              change={onChangeInput}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="DNI"
              type="number"
              name="dni"
              value={member.dni}
              change={onChangeInput}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="Phone"
              type="text"
              name="phone"
              value={member.phone}
              change={onChangeInput}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="Email"
              type="email"
              name="email"
              value={member.email}
              change={onChangeInput}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="City"
              type="text"
              name="city"
              value={member.city}
              change={onChangeInput}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="Date of birth"
              type="text"
              name="dob"
              value={member.dob}
              change={onChangeInput}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="Zip code"
              type="number"
              name="zip"
              value={member.zip}
              change={onChangeInput}
            />
          </div>
          <div className={styles.label_container}>
            <label className={styles.label}>Membership</label>
            <select
              className={styles.input}
              name="membership"
              value={member.membership}
              onChange={onChangeInput}
            >
              <option value="placeholder">Select category</option>
              <option value="classic">Classic</option>
              <option value="only_classes">Only Classes</option>
              <option value="black">Black</option>
            </select>
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="Password"
              type="password"
              name="password"
              value={member.password}
              change={onChangeInput}
            />
          </div>
          <div className={`${styles.label_container} ${styles.checkbox}`}>
            <Input
              labelText="Is member active?"
              type="checkbox"
              name="isActive"
              value={member.isActive}
              change={onChangeInput}
            />
          </div>
        </form>
        <div className={styles.confirm_button}>
          <Button
            classNameButton="addButton"
            action={() => setModalMessageOpen(true)}
            text={memberId ? 'Update' : 'Submit'}
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
          {memberId
            ? `Are you sure you wanna edit ${member.name}?`
            : `Are you sure you wanna add ${member.name} to the members list?`}
        </ConfirmModal>
      )}
      {showToast && (
        <ResponseModal handler={handleShowToast} state={stateToast} message={messageToast} />
      )}
    </div>
  );
};

export default MemberForm;
