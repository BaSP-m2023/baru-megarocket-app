import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './table.module.css';

import { deleteMember } from 'Redux/Members/thunks';

import ConfirmModal from 'Components/Shared/ConfirmModal';
import Button from 'Components/Shared/Button';

const Item = ({ member = { name: 'Nothing match', isActive: false } }) => {
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  const dispatch = useDispatch();

  return (
    <>
      <tr className={`${styles['table-row']}`}>
        <td>
          {member.name} {member.lastName}
        </td>
        <td>
          <label
            className={
              member.isActive
                ? `${styles.memberState} ${styles.memberActive}`
                : `${styles.memberState} ${styles.memberInactive}`
            }
          >
            {member.isActive ? 'Active' : 'Inactive'}
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
          title="Delete member"
          handler={handleModal}
          onAction={() => dispatch(deleteMember(member._id))}
          reason={'delete'}
        >
          Are you sure you wanna delete this member?
        </ConfirmModal>
      )}
    </>
  );
};

export default Item;
