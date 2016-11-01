import React from 'react'
import Slider from 'react-slider'
import { style } from 'glamor'

import asPage from './as_page.jsx'
import EditableImage from './editable_image.jsx'

const styles = {
  slider: style({
    height: '50px',
    backgroundColor: 'gray'
  }),

  sliderHandle: style({
    width: '10px',
    height: '100%',
    backgroundColor: 'black'
  })
}

function Footer ({ onClickCrop }) {
  return (
    <div>
      <button className='btn btn-primary pull-right' onClick={onClickCrop}>
        Save
      </button>
    </div>
  )
}

function EditPage ({
  setImage,
  imageURL,
  previewURL,
  imageWidth,
  imageHeight,
  onClickCrop,
  onChangeImageWidth,
  onChangeImageHeight,
  onChangeSlider,
  onScale
}) {
  return (
    <div>
      <div>
        <EditableImage setImage={setImage} src={imageURL} />
        <div className='row'>
          <div className='col-md-12'>
            <Slider
              className={`${styles.slider}`}
              handleClassName={`${styles.sliderHandle}`}
              min={5}
              max={15}
              defaultValue={10}
              onChange={onChangeSlider}
            />
            <img src={previewURL} className='img-responsive' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default asPage({ Footer })(EditPage)
