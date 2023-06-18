// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';

// import { useHistory, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import styles from './form.module.css';
// import Button from '../../Shared/Button';
// import { Input } from '../../Shared/Inputs';
// import ResponseModal from '../../Shared/ResponseModal';
// import ConfirmModal from '../../Shared/ConfirmModal';
// import { getActivities } from '../../../Redux/Activities/thunks';
// import { getTrainers } from '../../../Redux/Trainers/thunks';
// import { putClass, addClass } from '../../../Redux/Classes/thunks';
// import { handleDisplayToast } from '../../../Redux/Shared/ResponseToast/actions';
// function ClassForm() {
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const history = useHistory();
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { data } = useSelector((state) => state.classes);
//   const { show, message, state } = useSelector((state) => state.toast);
//   const trainers = useSelector((state) => state.trainers.data);
//   const activities = useSelector((state) => state.activities.list);
//   const {
//     register,
//     handleSubmit,
//     reset
//     //watch
//     // formState: { errors }
//   } = useForm({});

//   useEffect(() => {
//     getActivities(dispatch);
//     getTrainers(dispatch);
//     id && getById(id);
//   }, [dispatch]);

//   const createClass = async (newClass) => {
//     addClass(dispatch, newClass, history);
//   };

//   const getById = (id) => {
//     const dataID = data.find((classID) => classID._id === id);
//     let selectedActivity = '';
//     let selectedTrainer = '';
//     if (dataID) {
//       if (dataID.activity) {
//         selectedActivity = dataID.activity._id;
//       }
//       if (dataID.trainer) {
//         selectedTrainer = dataID.trainer._id;
//       }
//       localStorage.setItem('activity', selectedActivity);
//       localStorage.setItem('trainer', selectedTrainer);
//       localStorage.setItem('day', dataID.day);
//       localStorage.setItem('time', dataID.time);
//       localStorage.setItem('capacity', dataID.capacity);
//     }
//   };

//   const updateClass = () => {
//     putClass(dispatch, classes, id, history);
//   };

//   const onClickCreateClass = () => {
//     if (
//       Object.values(classes).every((prop) => {
//         if (prop === '') {
//           return false;
//         }
//         return true;
//       })
//     ) {
//       createClass(classes);
//       setError(false);
//     } else {
//       setError(true);
//     }
//   };

//   const onClickEditClass = () => {
//     if (
//       Object.values(classes).every((prop) => {
//         if (prop === '') {
//           return false;
//         }
//         return true;
//       })
//     ) {
//       updateClass();
//       localStorage.clear();
//       setError(false);
//     } else {
//       setError(true);
//     }
//   };

//   const handleConfirmModal = (e) => {
//     e.preventDefault();
//     setShowConfirmModal(true);
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     if (id) {
//       onClickCreateClass();
//     } else {
//       onClickEditClass();
//     }
//   };

//   const cancelForm = (e) => {
//     e.preventDefault();
//     localStorage.clear();
//     history.goBack();
//   };

//   return (
//     <section className={styles.formContainer}>
//       <div className={styles.formTitle}>
//         <h2 className={styles.title}>{id ? 'Create Class' : 'Edit Class'}</h2>
//       </div>
//       <form className={styles.form}>
//         <div className={styles.inputContainer}>
//           <label className={styles.label}>Activity</label>
//           <select value={classes.activity} name="activity" className={styles.select}>
//             <option value="">Select an activity</option>
//             {activities.map((activity) => (
//               <option key={activity._id} value={activity._id}>
//                 {activity.name}
//               </option>
//             ))}
//           </select>
//           {error && classes.activity === '' && (
//             <span className={styles.error}>Field is required</span>
//           )}
//         </div>
//         <div className={styles.inputContainer}>
//           <label className={styles.label}>Trainer</label>
//           <select className={styles.select} value={classes.trainer} name="trainer">
//             <option value="">Select a trainer</option>
//             {trainers.map((trainer) => (
//               <option key={trainer._id} value={trainer._id}>
//                 {trainer.firstName}
//               </option>
//             ))}
//           </select>
//           {error && classes.trainer === '' && (
//             <span className={styles.error}>Field is required</span>
//           )}
//         </div>
//         <div className={styles.inputContainer}>
//           <label className={styles.label}>Day</label>
//           <select className={styles.select} value={classes.day} name="day">
//             <option value="">Select a day</option>
//             <option value="Monday">Monday</option>
//             <option value="Tuesday">Tuesday</option>
//             <option value="Wednesday">Wednesday</option>
//             <option value="Thursday">Thursday</option>
//             <option value="Friday">Friday</option>
//             <option value="Saturday">Saturday</option>
//             <option value="Sunday">Sunday</option>
//           </select>
//           {error && classes.day === '' && <span className={styles.error}>Field is required</span>}
//         </div>
//         <div className={styles.inputContainer}>
//           <Input
//             labelText="Time"
//             type="time"
//             value={classes.time}
//             placeholder="Time"
//             name="time"
//             register={register}
//           />
//         </div>
//         <div className={styles.inputContainer}>
//           <Input
//             labelText="Capacity"
//             type="number"
//             name="capacity"
//             placeholder="Capacity"
//             register={register}
//           />
//         </div>
//         <div className={styles.buttonContainer}>
//           <Button
//             classNameButton="submitButton"
//             text={isCreateRoute ? 'Create' : 'Update'}
//             action={handleConfirmModal}
//           />
//           <Button classNameButton="cancelButton" text="Cancel" action={cancelForm} />
//         </div>
//       </form>
//       {show && (
//         <ResponseModal
//           handler={() => dispatch(handleDisplayToast(false))}
//           message={message}
//           state={state}
//         />
//       )}
//       {showConfirmModal && (
//         <ConfirmModal
//           title={id ? 'Create class' : 'Update class'}
//           handler={() => setShowConfirmModal(false)}
//           onAction={handleSubmit}
//           reason={'submit'}
//         >
//           {id
//             ? 'Are you sure you want to create this class?'
//             : 'Are you sure you want to update this class?'}
//         </ConfirmModal>
//       )}
//     </section>
//   );
// }

// export default ClassForm;
