import React, { useState } from 'react';

const Form = ({ hide, activityToUpdate, onAdd, onEdit }) => {
  // const { name, description } = activityToUpdate;
  const [activity, setActivity] = useState(activityToUpdate);

  // useEffect(() => {
  //   if (activityToUpdate) {
  //     setActivity({
  //       name,
  //       description
  //     });
  //   }
  // }, [activity]);

  const handleChanges = (e) => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onEdit(e, activity);
    onAdd(activity);
    // activityToUpdate ? console.log('asd') : console.log('etet');
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>{activityToUpdate !== {} ? 'Edit activity' : 'Add new activity'}</h3>
      <div>
        <label htmlFor="">Name</label>
        <input type="text" name="name" value={activity.name || ''} onChange={handleChanges} />
      </div>
      <div>
        <label htmlFor="">Description</label>
        <textarea
          name="description"
          value={activity.description || ''}
          onChange={handleChanges}
        ></textarea>
      </div>
      <div>
        <button onClick={() => hide()}>Cancel</button>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default Form;
