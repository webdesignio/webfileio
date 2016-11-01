import React, { Component } from 'react'

import App from './app.jsx'

export default class AppContainer extends Component {
  constructor () {
    super()
    this.handlers = {
      onClickLibraryTab: this.onClickTab.bind(this, 'library'),
      onClickEditTab: this.onClickTab.bind(this, 'edit'),
      onSelectLibraryFile: this.onSelectLibraryFile.bind(this)
    }
    this.state = {
      page: 'library',
      currentFile: null
    }
  }

  onClickTab (page, e) {
    e.preventDefault()
    this.setState({ page })
  }

  onSelectLibraryFile (file) {
    this.setState({ currentFile: file })
  }

  render () {
    return (
      <App {... this.props} {... this.state} {... this.handlers} />
    )
  }
}
