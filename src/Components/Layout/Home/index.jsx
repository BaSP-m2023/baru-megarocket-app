import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './home.module.css';

import { handleDisplayToast } from 'Redux/Shared/ResponseToast/actions';
import Landing from 'Components/Landing/Landing';
import ResponseModal from 'Components/Shared/ResponseModal';

function Home() {
  const dispatch = useDispatch();
  const { show, message, state } = useSelector((state) => state.toast);

  return (
    <>
      <section className={styles.container}>
        {show && (
          <ResponseModal
            handler={() => dispatch(handleDisplayToast(false))}
            state={state}
            message={message}
          />
        )}
      </section>
      <Landing />
    </>
  );
}

export default Home;
