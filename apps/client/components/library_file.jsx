import React from 'react'
import { style } from 'glamor'

const styles = {
  activeImage: style({
    backgroundColor: '#337ab7'
  })
}

export default function LibraryFile ({ url, isActive, onClick }) {
  return (
    <div className='col-md-3'>
      <img
        src={url}
        className={
          'img-responsive img-thumbnail' +
          (isActive ? ' ' + styles.activeImage : '')
        }
        onClick={onClick}
      />
    </div>
  )
}
