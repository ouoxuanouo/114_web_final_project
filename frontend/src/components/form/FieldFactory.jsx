import React from 'react'

export function createField(type, props) {
  switch (type) {
    case 'textarea':
      return <textarea {...props} className={`input min-h-[96px] ${props.className || ''}`} />
    case 'select':
      return (
        <select {...props} className={`input ${props.className || ''}`}>
          {props.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      )
    default:
      return <input {...props} className={`input ${props.className || ''}`} />
  }
}
