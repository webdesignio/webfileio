import React, { Component } from 'react'

import App from './app.jsx'

export default class AppContainer extends Component {
  constructor () {
    super()
    this.handlers = {
      onClickLibraryTab: this.onClickTab.bind(this, 'library'),
      onClickEditTab: this.onClickTab.bind(this, 'edit')
    }
    this.state = {
      page: 'edit'
    }
  }

  onClickTab (page, e) {
    e.preventDefault()
    this.setState({ page })
  }

  render () {
    return (
      <App {... this.props} {... this.state} {... this.handlers} />
    )
  }
}
