import React from 'react';

const getScheduleMember = (day, hour, memberClass) => {
  console.log(memberClass[0].time);
  if (day === memberClass[0].day && hour === memberClass[0].time) {
    console.log('asaasasasdfgfs');
    return <div>asasa</div>;
  }
};

export default getScheduleMember;
