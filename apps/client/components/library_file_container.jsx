import React, { Component } from 'react'

import LibraryFile from './library_file.jsx'

export default class LibraryFileContainer extends Component {
  constructor () {
    super()
    this.handlers = {
      onClick: this.onClick.bind(this)
    }
  }

  onClick (e) {
    e.preventDefault()
    this.props.onSelect(this.props.file)
  }

  render () {
    return (
      <LibraryFile
        {... this.props}
        {... this.handlers}
        {... this.props.file}
      />
    )
  }
}
