import React from 'react'
import styled from 'styled-components'

import asPage from './as_page.jsx'

const Container = styled.div`
  overflow: auto;
  height: calc(100vh - 180px);
`

function Footer () {
  return (
    <div>
      <button className='btn btn-primary'>Use</button>
    </div>
  )
}

function LibraryPage ({ chunks }) {
  return (
    <Container className='container'>
      {chunks.map(({ id, files }) =>
        <div key={id} className='row'>
          {files.map(file =>
            <div key={file.id} className='col-md-3'>
              <img src='/img/demo-screenshot.jpg' className='img-responsive' />
            </div>
          )}
        </div>
      )}
    </Container>
  )
}

export default asPage({ Footer })(LibraryPage)
