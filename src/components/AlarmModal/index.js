import React, { useState, useEffect } from 'react'
import { AlarmControl } from './AlarmControl'
import { EmojiBtn } from '../EmojiBtn'

export const AlarmModal = () => {
  const [alarms, setAlarms] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

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

    handleOpen();
  }

  return (
    <>
      <EmojiBtn title="Alarm" className="icon-btn" onClick={handleOpen}>
        {String.fromCodePoint(0x23F0)}
      </EmojiBtn>
      <div className={`modal-backdrop ${isOpen ? 'active' : ''}`} />
      <div className={`modal ${isOpen ? 'active' : ''}`}>
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
            <button className="button" onClick={handleOpen}>
            Close
          </button>
        </div>
      </div>

    </>
  )
}
