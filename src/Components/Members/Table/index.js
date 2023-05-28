import styles from './table.modules.css';

const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <tr className={styles.row}>
          <th>Name</th>
          <th>Lastname</th>
          <th>DNI</th>
          <th>Phone</th>
          <th>Email</th>
          <th>City</th>
          <th>Zip Code</th>
          <th>Status</th>
          <th>Membership</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        {data.map((member) => {
          return (
            <tr key={member.id} className={styles.row}>
              <td>{member.name}</td>
              <td>{member.lastName}</td>
              <td>{member.dni}</td>
              <td>{member.phone}</td>
              <td>{member.email}</td>
              <td>{member.city}</td>
              <td>{member.zip}</td>
              <td>{member.isActive}</td>
              <td>{member.membership}</td>
              <td>{member.password}</td>
              <button className="close_btn">&times;</button>
              <button className="edit_btn">EDIT</button>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
