import React, { useEffect, useState } from 'react';

const Form = ({ hide, activityToUpdate, onAdd, onEdit }) => {
  const [activity, setActivity] = useState(activityToUpdate);
  const formType = Object.entries(activityToUpdate).length === 0;

  useEffect(() => {
    if (formType) {
      setActivity({
        name: '',
        description: '',
        isActive: false
      });
    }
  }, [activityToUpdate]);

  const handleChanges = (e) => {
    const target = e.target.name;
    const value = target === 'isActive' ? e.currentTarget.checked : e.target.value;
    setActivity({ ...activity, [target]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    formType ? onAdd(activity) : onEdit(activityToUpdate._id, activity);
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>{formType ? 'Add new activity' : 'Edit activity'}</h3>
      <div>
        <label htmlFor="">Name</label>
        <input
          type="text"
          name="name"
          value={activity.name || ''}
          onChange={(e) => handleChanges(e)}
        />
      </div>
      <div>
        <label htmlFor="">Description</label>
        <textarea
          name="description"
          value={activity.description || ''}
          onChange={(e) => handleChanges(e)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="">Is active ?</label>
        <input
          type="checkbox"
          name="isActive"
          checked={activity.isActive || false}
          onChange={(e) => handleChanges(e)}
        />
      </div>
      <div>
        <button onClick={() => hide()}>Cancel</button>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default Form;
