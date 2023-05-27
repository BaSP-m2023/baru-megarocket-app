import styles from './list.module.css';

function ClassList({ classes }) {
  return (
    <div className={styles.tableContainer}>
      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>Activity</th>
            <th>Trainer</th>
            <th>Capacity</th>
            <th>Day</th>
            <th>Time</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {classes.length !== 0 &&
            classes.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.activity !== null ? item.activity.name : 'Empty'}</td>
                <td>{item.trainer.length !== 0 ? item.trainer[0].firstName : 'Empty'}</td>
                <td>{item.capacity}</td>
                <td>{item.day}</td>
                <td>{item.time}</td>
                <td></td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClassList;
