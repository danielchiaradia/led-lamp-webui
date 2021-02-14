import React, { useEffect, useMemo, useState } from 'react'
import { HEXToIntColor, title } from '../../../../helpers/utils'
import { calcInputProps, calcInputValue } from '../../../fieldsConfiguration'
import { sendWSEvent } from '../../../../helpers/requests'
import { EVENTS } from '../../../../helpers/constants'

const Control = ({ effectKey, value, handleChangeForm }) => {
  const memoizedProps = useMemo(() => calcInputProps(effectKey, value), [
    effectKey,
    value,
  ])

  const inputValue = calcInputValue(effectKey, value)

  return (
    <div>
      <h3>
        {title(effectKey)}: <span className="text-secondary">{value}</span>
      </h3>
      {typeof value === `boolean` ? (
        <label className="switch">
          <input
            placeholder={title(effectKey)}
            name={effectKey}
            value={inputValue}
            onChange={handleChangeForm}
            {...(typeof inputValue === `boolean` && { checked: inputValue })}
            {...memoizedProps}
          />
          <div />
        </label>
      ) : (
        <input
          className="control"
          placeholder={title(effectKey)}
          name={effectKey}
          value={inputValue}
          onChange={handleChangeForm}
          {...(typeof inputValue === `boolean` && { checked: inputValue })}
          {...memoizedProps}
        />
      )}
    </div>
  )
}

export const EffectControl = ({ effect = {}, setEffects, activeEffect }) => {
  const [formState, setFormState] = useState({ ...effect })
  const [sendUpdate, setSendUpdate] = useState({});

  useEffect(() => setFormState(effect), [effect])

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Object.keys(sendUpdate).length !== 0) {
        sendWSEvent(EVENTS.effects, sendUpdate);
      } 
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, 
  [sendUpdate]);

  useEffect(() => {
    const handler = setTimeout(() => {
      
      setEffects((prevEffects) => {
        return prevEffects.map((item, index) => {
          if (index === activeEffect) return formState
          return item
        })
      })
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [formState]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangeForm = (e) => {
    let value
    switch (e.target.type) {
      case 'checkbox':
        value = e.target.checked
        break
      case 'color':
        value = HEXToIntColor(e.target.value)
        break
      case 'range':
        value = parseInt(e.target.value)
        break
      default:
        value = e.target.value
    }
    setFormState({ ...formState, [e.target.name]: value })
    setSendUpdate({ ...formState, [e.target.name]: value });
  }

  return (
    <div>
      <h2>Effect control</h2>
      <div>
        {Object.keys(effect).map((key) => (
          <Control
            key={key}
            effectKey={key}
            value={formState[key]}
            handleChangeForm={handleChangeForm}
          />
        ))}
      </div>
    </div>
  )
}
