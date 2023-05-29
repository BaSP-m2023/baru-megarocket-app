import React from 'react';

const DataViewTD = ({
  editEnable,
  selectedClass,
  item,
  itemValidation,
  itemData,
  typeInput,
  options,
  typeOptions,
  className
}) => {
  return (
    <>
      <td>
        {editEnable && selectedClass && selectedClass._id === item._id ? (
          typeInput !== 'select' && typeInput !== 'selectDay' ? (
            <input className={className} type={typeInput} />
          ) : typeInput !== 'selectDay' ? (
            <select value={itemData} name="activity">
              {options.map((option) => (
                <option key={option._id} value={option._id}>
                  {typeOptions === 'activities' ? option.name : option.firstName}
                </option>
              ))}
            </select>
          ) : (
            <select name="day">
              <option value="">Select a day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          )
        ) : item && itemValidation !== null && itemValidation !== 0 ? (
          itemData
        ) : (
          'Empty'
        )}
      </td>
    </>
  );
};

export default DataViewTD;
