import React, { useState } from 'react';

const Form = ({ hide, activityToUpdate, onAdd, onEdit }) => {
  const { name, description } = activityToUpdate;
  const [activityUpdated, setActivityUpdated] = useState({ name, description });
  const [newActivity, setNewActivity] = useState({ name: '', description: '' });

  const handleChanges = (e) => {
    activityToUpdate
      ? setActivityUpdated((prevValues) => ({
          ...prevValues,
          [e.target.name]: e.target.value
        }))
      : setNewActivity((prevValues) => ({
          ...prevValues,
          [e.target.name]: e.target.value
        }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    activityToUpdate ? onEdit(activityToUpdate._id, activityUpdated) : onAdd(newActivity);
  };

  return (
    <form action="">
      <div>
        <label htmlFor="">Name</label>
        <input
          type="text"
          name="name"
          value={activityUpdated.name || ''}
          onChange={handleChanges}
        />
      </div>
      <div>
        <label htmlFor="">Description</label>
        <textarea
          name="description"
          value={activityUpdated.description || ''}
          onChange={handleChanges}
        ></textarea>
      </div>
      <div>
        <button onClick={hide}>Cancel</button>
        <button type="submit" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
