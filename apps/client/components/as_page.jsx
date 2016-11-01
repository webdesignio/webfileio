import React from 'react'
import styled from 'styled-components'

const ModalContent = styled.div`
  position: relative;
  min-height: 100vh;
`

const ModalFooter = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
`

const renderEditTab = ({ page, onClickEditTab }) =>
  <li className={page === 'edit' ? 'active' : ''}>
    <a href='#' onClick={onClickEditTab}>Edit</a>
  </li>

const renderFooter = ({ Footer }, props) =>
  <ModalFooter className='modal-footer'>
    <Footer {... props} />
  </ModalFooter>

export default function asPage ({ Footer } = {}) {
  return Child =>
    props =>
      <div className='modal fade in' style={{ display: 'block' }}>
        <ModalContent className='modal-content'>
          <div className='modal-header'>
            <h4 className='modal-title'>Test</h4>
          </div>
          <div className='modal-body'>
            <ul className='nav nav-tabs'>
              <li className={props.page === 'library' ? 'active' : ''}>
                <a href='#' onClick={props.onClickLibraryTab}>Library</a>
              </li>
              {props.currentFile
                ? renderEditTab(props)
                : null}
            </ul>
            <Child {... props} />
          </div>
          {Footer ? renderFooter({ Footer }, props) : null}
        </ModalContent>
      </div>
}
