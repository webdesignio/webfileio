import React from 'react'

import LibraryPageContainer from './library_page_container.jsx'
import EditPageContainer from './edit_page_container.jsx'

const pages = {
  library: LibraryPageContainer,
  edit: EditPageContainer
}

export default function App (props) {
  const { page } = props
  const Page = pages[page]
  return <Page {... props} />
}
