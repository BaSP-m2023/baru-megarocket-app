import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './table.module.css';
import { faPen, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { deleteMember, updateMember } from 'Redux/Members/thunks';

import ConfirmModal from 'Components/Shared/ConfirmModal';

const Item = ({ member = { name: 'Nothing match', isActive: false } }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [isChecked, setIsChecked] = useState(null);
  const [change, setChange] = useState(null);
  const [activeToggle, setActiveToggle] = useState(false);
  const defaultMember = {
    isActive: !member.isActive
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

  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const membershipToUpper = () => {
    let upperMembership = capitalizeFirstLetter(member.membership);
    if (upperMembership === 'Only_classes') {
      upperMembership = 'Only Classes';
    }
    return upperMembership;
  };

  return (
    <>
      <tr className={`${styles['row']}`}>
        <td className={styles.member}>
          <div className={styles.avatarContainer}>
            {member.avatar && (
              <img
                className={styles.avatar}
                src={`${process.env.PUBLIC_URL}/assets/avatars/${member.avatar}.jpg`}
              />
            )}
            {!member.avatar && <FontAwesomeIcon icon={faUser} className={styles.avatar} />}{' '}
            <p>
              {member.name} {member.lastName}
            </p>
          </div>
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
        <td>{membershipToUpper()}</td>
        <td>
          <Link to={`members/edit/${member._id}`}>
            <FontAwesomeIcon icon={faPen} testid="members-edit-btn" className={styles.editButton} />
          </Link>
        </td>
        <td>
          <FontAwesomeIcon
            icon={faTrash}
            testid="activities-delete-btn"
            className={styles.deleteButton}
            onClick={() => handleModal()}
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
            ? 'Are you sure you want to change the status of this member?'
            : 'Are you sure you wanna delete this member?'}
        </ConfirmModal>
      )}
    </>
  );
};

export default Item;
