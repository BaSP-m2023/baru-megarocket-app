import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './table.module.css';

import { deleteMember, updateMember } from 'Redux/Members/thunks';

import ConfirmModal from 'Components/Shared/ConfirmModal';
import { Button } from 'Components/Shared/Button';

const Item = ({ member = { name: 'Nothing match', isActive: false } }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [isChecked, setIsChecked] = useState(null);
  const [change, setChange] = useState(null);
  const [activeToggle, setActiveToggle] = useState(false);
  const defaultMember = {
    name: member.name,
    lastName: member.lastName,
    dni: member.dni,
    phone: member.phone,
    city: member.dni,
    dob: member.dob,
    zip: member.zip,
    isActive: !member.isActive,
    membership: member.membership
  };

  const handleModal = () => {
    setModal(!modal);
    setActiveToggle(false);
  };

  useEffect(() => {
    setIsChecked(member.isActive);
  }, []);

  const handleCheckboxChange = (event) => {
    setChange(event.target.checked);
    setActiveToggle(true);
    setModal(true);
  };

  const handleAction = () => {
    if (activeToggle) {
      setIsChecked(change);
      dispatch(updateMember(member._id, defaultMember));
      setActiveToggle(false);
    } else {
      dispatch(deleteMember(member._id));
    }
  };

  return (
    <>
      <tr className={`${styles['table-row']}`}>
        <td>
          {member.name} {member.lastName}
        </td>
        <td>
          <label className={styles.switch}>
            <input
              className={styles.switchInput}
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            ></input>
            <span className={styles.slider}></span>
          </label>
        </td>
        <td>
          <Link to={`members/edit/${member._id}`}>
            <Button
              img={process.env.PUBLIC_URL + '/assets/images/edit-icon.png'}
              testid="members-edit-btn"
            />
          </Link>
        </td>
        <td>
          <Button
            img={process.env.PUBLIC_URL + '/assets/images/delete-icon.png'}
            action={() => handleModal()}
            testid="members-delete-btn"
          />
        </td>
      </tr>
      {modal && (
        <ConfirmModal
          title={activeToggle ? 'Active Status' : 'Delete member'}
          handler={handleModal}
          onAction={handleAction}
          reason={activeToggle ? 'submit' : 'delete'}
        >
          {activeToggle
            ? 'Are you sure you wanna active status memberships for this member?'
            : 'Are you sure you wanna delete this member?'}
        </ConfirmModal>
      )}
    </>
  );
};

export default Item;
