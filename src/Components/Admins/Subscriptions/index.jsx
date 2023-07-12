import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSubscriptions } from 'Redux/Subscriptions/thunks';
import { getClasses } from 'Redux/Classes/thunks';

import Table from './Table';

const Subscriptions = () => {
  const dispatch = useDispatch();

  const subscriptions = useSelector((state) => state.subscriptions.data);
  useEffect(() => {
    dispatch(getSubscriptions());
    dispatch(getClasses());
  }, []);

  return (
    <section>
      <div>
        <Table data={subscriptions} />
      </div>
    </section>
  );
};
export default Subscriptions;
