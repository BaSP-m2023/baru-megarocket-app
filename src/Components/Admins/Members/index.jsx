import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './members.module.css';

import { getMembers } from 'Redux/Members/thunks';
import { handleDisplayToast } from 'Redux/Shared/ResponseToast/actions';

import List from './Table/List';
import ResponseModal from 'Components/Shared/ResponseModal';
import { Button } from 'Components/Shared/Button';
import Loader from 'Components/Shared/Loader';

function Members() {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.data);
  const pending = useSelector((state) => state.members.isPending);
  const { show, message, state } = useSelector((state) => state.toast);

  useEffect(() => {
    dispatch(getMembers());
  }, [dispatch]);

  if (pending) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }
  return (
    <section>
      <h1 className={styles.title}>Members</h1>
      {!pending && members.length === 0 && 'There are no members'}
      {!pending && members.length > 0 ? <List members={members} /> : null}
      <div className={styles.button}>
        <Link Link to="members/add" data-testid="add-member-link">
          <Button classNameButton="addButton" text="+ Add new" />
        </Link>
      </div>
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
