import styles from './table.module.css';
import ButtonSlider from './ButtonSlider/ButtonSlider';

const Item = ({ member, handleModal }) => {
  return (
    <tr className={`${styles['table-row']}`}>
      <td>{member.name}</td>
      <td>
        <ButtonSlider status={member.isActive} />
      </td>
      <td>
        <img
          className={`${styles['table-buttons']}`}
          src="/assets/images/edit-icon.png"
          alt="edit icon"
        />
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
