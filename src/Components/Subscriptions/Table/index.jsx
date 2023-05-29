import React from 'react';

const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Classes</th>
          <th>Members</th>
          <th>date</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((subscription) => (
            <tr key={subscription._id}>
              <td>{`${subscription.classes.day} ${subscription.classes.time}`}</td>
              {!subscription.members ? (
                <td>{'empty'}</td>
              ) : (
                <td>{`${subscription.members.name} ${subscription.members.lastName}`}</td>
              )}
              <td>{subscription.date}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">Cannot reach any subscription</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
export default Table;
