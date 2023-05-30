import { useEffect, useState } from 'react';
import styles from './members.module.css';

import List from './Table/List';
import DeleteModal from './Modal/DeleteModal';
import Toast from './Toast/Toast';

function Members() {
  const [members, setMembers] = useState([]);
  const [memberToDelete, setMember] = useState({});
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastContent, setContent] = useState({});

  const handleModal = (member = {}) => {
    setMember(member);
    setModal(!modal);
  };

  const handleToast = (msg) => {
    setContent(msg);
    setToast(!toast);
  };

  useEffect(() => {
    const getMembers = async () => {
      const membersFromDb = await getAllMembers();
      console.log(membersFromDb);
      setMembers(membersFromDb);
    };
    getMembers();
  }, []);

  const getAllMembers = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_URL_API}/api/member`);
      console.log(res);
      const { data } = await res.json();
      return data;
    } catch (error) {
      handleToast({
        content: 'Something went wrong :( try again later',
        className: 'toast-wrong'
      });
      return [];
    }
  };

  // const getMember = async (id) => {
  //   try {
  //     const res = await fetch(`${process.env.REACT_APP_URL_API}/api/member/${id}`);
  //     const { data } = await res.json();
  //     setMember(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const deleteMember = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_URL_API}/api/member/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();

      if (res.status === 200) {
        handleToast({ content: data.message, className: 'toast-ok' });
        setMembers(members.filter((member) => member._id !== id));
      }

      if (res.status !== 200) {
        handleToast({ content: data.msg, className: 'toast-wrong' });
      }

      handleModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.container}>
      {members.length > 0 ? (
        <List members={members} handleModal={handleModal} />
      ) : (
        'There are not members yet :('
      )}
      {modal && <DeleteModal hide={handleModal} onDelete={deleteMember} member={memberToDelete} />}
      {toast && (
        <Toast
          handler={handleToast}
          content={toastContent.content}
          classes={toastContent.className}
        />
      )}
    </section>
  );
}

export default Members;
