import React, { useEffect } from 'react';
import styles from './members.module.css';
import List from './Table/List';
import ResponseModal from '../Shared/ResponseModal';
import Button from '../Shared/Button';
import { Link } from 'react-router-dom';
import Loader from '../Shared/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getMembers } from '../../Redux/Members/thunks';
import { handleDisplayToast } from '../../Redux/Shared/ResponseToast/actions';

function Members() {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.data);
  const pending = useSelector((state) => state.members.isPending);
  const { show, message, state } = useSelector((state) => state.toast);

  useEffect(() => {
    getMembers(dispatch);
  }, [dispatch]);

  return (
    <section className={styles.container}>
      {pending && <Loader />}
      {!pending && members.length > 0 ? <List members={members} /> : null}
      {!pending && members.length === 0 && 'There are no members'}
      <Link to="/members/add">
        <Button classNameButton="addButton" text="+ Add new" />
      </Link>
      {show && (
        <ResponseModal
          handler={() => dispatch(handleDisplayToast(false))}
          state={state}
          message={message}
        />
      )}
    </section>
  );
}

export default Members;
