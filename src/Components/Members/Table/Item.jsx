import styles from './table.module.css';
import ButtonSlider from './ButtonSlider/ButtonSlider';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ConfirmModal from '../../Shared/ConfirmModal';
import Button from '../../Shared/Button';

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
