import React from 'react'

import LibraryPage from './library_page.jsx'
import EditPageContainer from './edit_page_container.jsx'

const pages = {
  library: LibraryPage,
  edit: EditPageContainer
}

export default function App (props) {
  const { page } = props
  const Page = pages[page]
  return <Page {... props} />
}
