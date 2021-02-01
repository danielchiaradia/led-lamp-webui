import React, { useState } from 'react'
import TimeField from 'react-simple-timefield';

export const AlarmControl = ({ alarm }) => {
    const [enabled, setEnabled] = useState(alarm.enabled);
    const [alarmObject] = useState(alarm);

    const toggleAlarm = (e) => {
        setEnabled(!enabled);
        alarmObject.enabled = !enabled;
    }

    const timeChanged = (e, value) => {
      alarmObject.time = value;
    }

  return (
    <>
    {alarm.day}: <TimeField value={alarm.time} disabled={!enabled} onChange={timeChanged}/> <input type="checkbox" checked={enabled} onChange={toggleAlarm}/>
    </>
  )
}
