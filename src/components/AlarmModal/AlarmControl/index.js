import React, { useState } from 'react'
import TimeField from 'react-simple-timefield';

export const AlarmControl = ({ weekday }) => {
    const [enabled, setEnabled] = useState(false);

    const toggleAlarm = (e) => {
        setEnabled(!enabled);
    }

  return (
    <>
    {weekday}: <TimeField disabled={!enabled}/> <input type="checkbox" onChange={toggleAlarm}/>
    </>
  )
}
