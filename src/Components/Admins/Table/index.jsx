import React from 'react';
import './table.module.css';

function Table({ admins, deleteAdmin, editButton }) {
  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>DNI</th>
          <th>Phone</th>
          <th>Email</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody>
        {admins.map((admin) => {
          return (
            <tr key={admin._id}>
              <td>{admin.firstName}</td>
              <td>{admin.lastName}</td>
              <td>{admin.dni}</td>
              <td>{admin.phone}</td>
              <td>{admin.email}</td>
              <td>{admin.city}</td>
              <td></td>
              <td>
                <button onClick={() => editButton(admin._id)}>EDIT</button>
              </td>
              <td>
                <button onClick={() => deleteAdmin(admin._id)}>DELETE</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default Table;
