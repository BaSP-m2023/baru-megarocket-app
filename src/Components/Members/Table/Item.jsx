import styles from './table.module.css';
import ButtonSlider from './ButtonSlider/ButtonSlider';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Item = ({ member = { name: 'Nothing match', isActive: false }, handleModal }) => {
  const [memberId, setMemberId] = useState(null);

  const handleEdit = (id) => {
    setMemberId(id);
  };

  return (
    <tr className={`${styles['table-row']}`}>
      <td>
        {member.name} {member.lastName}
      </td>
      <td>
        <ButtonSlider status={member.isActive} />
      </td>
      <td>
        <Link to={'/members/edit/' + memberId}>
          <img
            className={`${styles['table-buttons']}`}
            src="/assets/images/edit-icon.png"
            alt="edit icon"
            onClick={() => handleEdit(member._id)}
          />
        </Link>
      </td>
      <td>
        <img
          className={`${styles['table-buttons']}`}
          src="/assets/images/delete-icon.png"
          alt="delete icon"
          onClick={() => handleModal(member)}
        />
      </td>
    </tr>
  );
};

export default Item;
