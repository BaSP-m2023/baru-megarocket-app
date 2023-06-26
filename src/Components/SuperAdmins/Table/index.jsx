import styles from './table.module.css';
import Button from '../../Shared/Button';
import ConfirmModal from '../../Shared/ConfirmModal';
import Loader from '../../Shared/Loader';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSuperadmins, deleteSuperadmin } from '../../../Redux/SuperAdmins/thunks';

const Table = () => {
  const [idToDelete, setIdToDelete] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const dispatch = useDispatch();

  const superadminsState = useSelector((state) => state.superadmins);
  const superadmins = superadminsState.superadmins;

  useEffect(() => {
    getSuperadmins(dispatch);
  }, [dispatch]);

  const confirmDelete = (id) => {
    setShowConfirmDelete(true);
    setIdToDelete(id);
  };

  const deleteItem = () => {
    dispatch(deleteSuperadmin(idToDelete));
    setShowConfirmDelete(false);
  };

  return (
    <div className={styles.container}>
      {showConfirmDelete && (
        <ConfirmModal
          title={'Delete superadmin'}
          reason={'delete'}
          handler={() => setShowConfirmDelete(false)}
          onAction={deleteItem}
        >
          Are you sure you want to delete this superadmin?
        </ConfirmModal>
      )}
      {superadminsState.loading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.trow}>
                <th className={styles.thead}>Name</th>
                <th className={styles.thead}>Last name</th>
                <th className={styles.thead}>Email</th>
                <th className={styles.thead}>Password</th>
                <th className={styles.extrathead}></th>
              </tr>
            </thead>
            <tbody data-testid="superadmins-list">
              {superadmins?.map((item) => {
                return (
                  <tr key={item._id} className={styles.trow}>
                    <td className={styles.tdata}>{item.name}</td>
                    <td className={styles.tdata}>{item.lastName}</td>
                    <td className={styles.tdata}>{item.email}</td>
                    <td className={styles.tdata}>{item.password}</td>
                    <td className={styles.actionButtons}>
                      <Link to={{ pathname: `super-admins/edit/${item._id}` }}>
                        <Button
                          img={`${process.env.PUBLIC_URL}/assets/images/edit-icon.png`}
                          testid="superadmins-edit-btn"
                        />
                      </Link>
                      <Button
                        img={`${process.env.PUBLIC_URL}/assets/images/delete-icon.png`}
                        action={() => confirmDelete(item._id)}
                        testid="superadmins-delete-btn"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Link to="/super-admins/add" className={styles.addItem} data-testid="superadmin-add-link">
            <Button text={'+ Add new'} classNameButton={'addButton'} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Table;
