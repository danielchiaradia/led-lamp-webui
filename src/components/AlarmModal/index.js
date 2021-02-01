import React, { useState } from 'react'
import { uploadSize, uploadBinary } from '../../helpers/requests'
import { EmojiBtn } from '../EmojiBtn'
import { AlarmControl } from './AlarmControl'

export const AlarmModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const changeUploadProgress = (e) => {
    setProgress(((e.loaded / e.total) * 100).toFixed(1))
  }

  const handleUploadFile = (e) => {
    setLoading(true)
    uploadSize(file.size).then(() =>
      uploadBinary(file, changeUploadProgress).then(() => {
        setLoading(false)
        handleOpen()
      })
    )
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
          <AlarmControl weekday="Monday"/>
          <AlarmControl weekday="Tuesday"/>
          <AlarmControl weekday="Wednesday"/>
          <AlarmControl weekday="Thursday"/>
          <AlarmControl weekday="Friday"/>
          <AlarmControl weekday="Saturday"/>
          <AlarmControl weekday="Sunday"/>
        </div>
        <div className="modal-actions">
          <button
            className="button mr-1"
            disabled={loading || !file}
            onClick={handleUploadFile}
          >
            Save
          </button>
          <button className="button" disabled={loading} onClick={handleOpen}>
            Cancel
          </button>
        </div>
      </div>
    </>
  )
}
