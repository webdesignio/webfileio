import React, { Component } from 'react'
import shortid from 'shortid'
import chunk from 'lodash/fp/chunk'
import compose from 'lodash/fp/compose'
import map from 'lodash/fp/map'
import { createSelector } from 'reselect'

import LibraryPage from './library_page.jsx'

export default class LibraryPageContainer extends Component {
  constructor () {
    super()
    this.chunks = createSelector(
      ({ files }) => files,
      compose(map(files => ({ id: shortid(), files })), chunk(4))
    )
    this.state = {
      files: (function () {
        const a = []
        for (let i = 0; i < 100; i++) {
          a.push({ id: shortid() })
        }
        return a
      })()
    }
  }

  render () {
    return (
      <LibraryPage
        {... this.props}
        {... this.state}
        chunks={this.chunks(this.state, this.props)}
      />
    )
  }
}
