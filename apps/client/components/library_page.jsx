import React from 'react'

import asPage from './as_page.jsx'
import LibraryFileContainer from './library_file_container.jsx'
import ScrollContainer from './scroll_container.jsx'

function Footer () {
  return (
    <div>
      <button className='btn btn-primary'>Use</button>
    </div>
  )
}

function LibraryPage ({ chunks, currentFile, onClickImage, onSelectLibraryFile }) {
  return (
    <ScrollContainer className='container'>
      {chunks.map(({ id, files }) =>
        <div key={id} className='row'>
          {files.map(file =>
            <LibraryFileContainer
              key={file.id}
              file={file}
              isActive={currentFile && currentFile.id === file.id}
              onSelect={onSelectLibraryFile}
            />
          )}
        </div>
      )}
    </ScrollContainer>
  )
}

export default asPage({ Footer })(LibraryPage)
