import styles from './home.module.css';
import Button from 'Components/Shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ResponseModal from 'Components/Shared/ResponseModal';
import { handleDisplayToast } from 'Redux/Shared/ResponseToast/actions';

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const role = sessionStorage.getItem('role');
  const { show, message, state } = useSelector((state) => state.toast);

  return (
    <>
      <section className={styles.container}>
        <h2>Home</h2>
        {!role && (
          <div className={styles.buttonContainer}>
            <Button
              text="SignUp"
              classNameButton="submitButton"
              action={() => history.push('/signup')}
            />
            <Button
              text="Login"
              classNameButton="submitButton"
              action={() => history.push('/login')}
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
    </>
  );
}

export default Home;
