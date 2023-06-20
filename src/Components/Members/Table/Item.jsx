import styles from './table.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import Button from 'Components/Shared/Button';
import { deleteMember } from 'Redux/Members/thunks';
import { useDispatch } from 'react-redux';

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
          <Link to={`/members/edit/${member._id}`}>
            <Button img={process.env.PUBLIC_URL + '/assets/images/edit-icon.png'} />
          </Link>
        </td>
        <td>
          <Button
            img={process.env.PUBLIC_URL + '/assets/images/delete-icon.png'}
            action={() => handleModal()}
          />
        </td>
      </tr>
      {modal && (
        <ConfirmModal
          title="Delete member"
          handler={handleModal}
          onAction={() => deleteMember(dispatch, member._id)}
          reason={'delete'}
        >
          Are you sure you wanna delete this member?
        </ConfirmModal>
      )}
    </>
  );
};

export default Item;
