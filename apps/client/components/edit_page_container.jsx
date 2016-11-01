import url from 'url'
import React, { Component } from 'react'
import Cropper from 'cropperjs'

import EditPage from './edit_page.jsx'

export default class EditPageContainer extends Component {
  constructor () {
    super()
    this.handlers = {
      onChangeImageWidth: this.onChangeImageField.bind(this, 'width'),
      onChangeImageHeight: this.onChangeImageField.bind(this, 'height'),
      onClickCrop: this.onClickCrop.bind(this),
      onScale: this.onScale.bind(this),
      onChangeSlider: this.onChangeSlider.bind(this),
      setImage: this.setImage.bind(this)
    }
    this.state = {
      previewURL: '',
      imageURL: '/img/404-penguin.svg',
      isResizable: true,
      aspectRatio: NaN,
      imageWidth: 0,
      imageHeight: 0,
      isReady: false
    }
  }

  componentDidMount () {
    const { query } = url.parse(window.location.href, true)
    let aspectRatio = NaN
    let resizable
    try {
      const a = JSON.parse(query.aspectRatio)
      if (Array.isArray(a) && a.length === 2) {
        aspectRatio = a[0] / a[1]
      }
    } catch (e) {}
    try {
      resizable = !!JSON.parse(query.resizable)
    } catch (e) {}
    if (!Number.isNaN(aspectRatio)) resizable = true
    this.cropper = new Cropper(this.image, {
      aspectRatio,
      cropBoxResizable: resizable,
      zoomOnWheel: false,
      dragMode: 'move',
      ready: () => {
        const d = this.cropper.getImageData()
        this.setState({
          isReady: true,
          imageWidth: d.width,
          imageHeight: d.height
        })
      }
    })
  }

  componentWillUnmount () {
    this.cropper.destroy()
  }

  onChangeImageField (field, e) {
    this.setState({ [field]: Number(e.target.value) })
  }

  onClickCrop (e) {
    e.preventDefault()
    const canvas = this.cropper.getCroppedCanvas()
    this.setState({ previewURL: canvas.toDataURL() })
  }

  onScale (size) {
    const origin = this.cropper.getImageData()
    const ref =
      size.width !== this.state.imageWidth
        ? 'width'
        : 'height'
    const scaleFactor = size[ref] / origin[ref]
    this.cropper.scale(scaleFactor, scaleFactor)
    this.setState({
      imageWidth: Math.round(origin.width * scaleFactor),
      imageHeight: Math.round(origin.height * scaleFactor)
    })
  }

  onChangeSlider (e) {
    const origin = this.cropper.getImageData()
    const scaleFactor = e / 10
    this.cropper.scale(scaleFactor, scaleFactor)
    this.setState({
      imageWidth: Math.round(origin.width * scaleFactor),
      imageHeight: Math.round(origin.height * scaleFactor)
    })
  }

  setImage (image) {
    this.image = image
  }

  render () {
    return (
      <EditPage
        {... this.props}
        {... this.state}
        {... this.handlers}
        imageURL={this.props.currentFile.url}
      />
    )
  }
}
