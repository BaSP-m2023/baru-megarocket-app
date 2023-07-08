import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './home.module.css';

import { handleDisplayToast } from 'Redux/Shared/ResponseToast/actions';
import Landing from 'Components/Landing/Landing';

import Button from 'Components/Shared/Button';
import ResponseModal from 'Components/Shared/ResponseModal';

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const role = sessionStorage.getItem('role');
  const { show, message, state } = useSelector((state) => state.toast);

  return (
    <>
      <section className={styles.container}>
        {!role && !sessionStorage.getItem('role') && (
          <div className={styles.buttonContainer} data-testid="home-buttons-container">
            <Button
              text="Sign Up"
              classNameButton="submitButton"
              action={() => history.push('/auth/signup')}
            />
            <Button
              text="Log In"
              classNameButton="submitButton"
              action={() => history.push('/auth/login')}
            />
          </div>
        )}

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
