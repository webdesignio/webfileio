import React from 'react'

export default function EditableImage ({ setImage, src }) {
  return (
    <img
      style={{ maxWidth: '100%' }}
      ref={setImage}
      src={src}
    />
  )
}
