const Item = ({ member }) => {
  return (
    <tr>
      <td>{member.name}</td>
      <td>{member.isActive ? 'Active' : 'Disable'}</td>
      <td>editar</td>
      <td>eliminar</td>
    </tr>
  );
};

export default Item;
