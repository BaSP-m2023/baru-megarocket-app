import styles from './table.module.css';
import ButtonSlider from './ButtonSlider/ButtonSlider';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ConfirmModal from '../../Shared/ConfirmModal';

const Item = ({ member = { name: 'Nothing match', isActive: false }, deleteMember }) => {
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <tr className={`${styles['table-row']}`}>
        <td>
          {member.name} {member.lastName}
        </td>
        <td>
          <ButtonSlider status={member.isActive} />
        </td>
        <td>
          <Link to={`/members/edit/${member._id}`}>
            <img
              className={`${styles['table-buttons']}`}
              src="/assets/images/edit-icon.png"
              alt="edit icon"
            />
          </Link>
        </td>
        <td>
          <img
            className={`${styles['table-buttons']}`}
            src="/assets/images/delete-icon.png"
            alt="delete icon"
            onClick={() => handleModal()}
          />
        </td>
      </tr>
      {modal && (
        <ConfirmModal
          title="Delete member"
          handler={handleModal}
          onAction={() => deleteMember(member._id)}
          reason={'delete'}
        >
          Are you sure you wanna delete this member?
        </ConfirmModal>
      )}
    </>
  );
};

export default Item;
