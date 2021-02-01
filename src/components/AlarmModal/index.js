import React, { useState, useEffect } from 'react'
import { AlarmControl } from './AlarmControl'


export const AlarmModal = () => {
  const [alarms, setAlarms] = useState([])

  useEffect(() => {
    let fetchAlarms = async () => {
      try {
        let response = await fetch('/alarm.json')
        if (response.ok) {
          let text = await response.text()
          try {
            console.log(text);
            setAlarms(JSON.parse(text))
          } catch (e) {
            console.log(e)
          }
        } else {
          console.log('Error loading settings: ' + response.status)
        }
      } catch (e) {
        console.log(e)
      }
    }

    fetchAlarms();
  }, [])

  const saveAlarms = (e) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alarms)
  };
  fetch('/alarm.json', requestOptions)
  .then(response => setAlarms(response.json()));
  }

  return (
    <>
        <h2 className="modal-heading">Setup Alarms</h2>        
        <div className="alarm-container-layout">

          {alarms.map(alarm => (
            <AlarmControl key={alarm.day} alarm={alarm} />
          ))}
        </div>
        <div className="modal-actions">
          <button
            className="button mr-1"
            onClick={saveAlarms}
          >
            Save
          </button>
        </div>
    </>
  )
}
