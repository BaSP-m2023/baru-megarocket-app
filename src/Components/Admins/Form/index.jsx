import './form.module.css';
import { useEffect, useState } from 'react';

function Form({ title, addAdmin, editAdmin, idToUpdate, admins }) {
  const [admin, setAdmin] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    city: '',
    password: ''
  });

  useEffect(() => {
    if (idToUpdate !== null) {
      let adminToUpdate = admins.filter((admin) => idToUpdate === admin._id);
      adminToUpdate = adminToUpdate[0];
      let { _id, __v, ...adminKeys } = adminToUpdate;
      console.log(_id, __v);
      setAdmin(adminKeys);
    }
  }, []);

  const onChangeInput = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (title === 'Edit admin') {
      editAdmin(idToUpdate, admin);
    } else {
      addAdmin(admin);
      setAdmin({
        firstName: '',
        lastName: '',
        dni: '',
        phone: '',
        email: '',
        city: '',
        password: ''
      });
    }
  };

  return (
    <div className="container">
      <div>
        <h2>{title}</h2>
      </div>
      <form className="signup-form" onSubmit={onSubmit}>
        <div className="left-container">
          <div className="label-input">
            <label className="label-form-left" htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName"
              className="input-form"
              name="firstName"
              type="text"
              value={admin.firstName}
              onChange={onChangeInput}
            />
          </div>
          <div className="label-input">
            <label className="label-form-left" htmlFor="lastName">
              Last Name
            </label>
            <input
              id="lastname"
              className="input-form"
              name="lastName"
              type="text"
              value={admin.lastName}
              onChange={onChangeInput}
            />
          </div>
          <div className="label-input">
            <label className="label-form-left" htmlFor="dni">
              DNI
            </label>
            <input
              id="dni"
              className="input-form"
              name="dni"
              type="text"
              value={admin.dni}
              onChange={onChangeInput}
            />
          </div>
          <div className="label-input">
            <label className="label-form-left" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              className="input-form"
              name="phone"
              type="text"
              value={admin.phone}
              onChange={onChangeInput}
            />
          </div>
        </div>
        <div className="right-container">
          <div className="label-input">
            <label className="label-form-left" htmlFor="city">
              City
            </label>
            <input
              id="city"
              className="input-form"
              name="city"
              type="text"
              value={admin.city}
              onChange={onChangeInput}
            />
          </div>
          <div className="label-input">
            <label className="label-form-left" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="input-form"
              name="email"
              type="text"
              value={admin.email}
              onChange={onChangeInput}
            />
          </div>
          <div className="label-input">
            <label className="label-form-left" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="input-form"
              name="password"
              type="password"
              value={admin.password}
              onChange={onChangeInput}
            />
          </div>
          <button type="submit">Add Admin</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
