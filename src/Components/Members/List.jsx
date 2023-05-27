import Item from './Item';

const List = ({ members }) => {
  return (
    <table>
      <thead>
        <th>Members</th>
        <th>Membership Status</th>
        <th></th>
      </thead>
      <tbody>
        {members.map((member) => (
          <Item key={member._id} member={member} />
        ))}
      </tbody>
    </table>
  );
};

export default List;
