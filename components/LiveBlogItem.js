import { useState, useEffect } from 'react'
import styled, { css, createGlobalStyle } from 'styled-components'
import LiveBlogBottomActions from './LiveBlogBottomActions'
import LiveBlogItemContent from './LiveBlogItemContent'
import LiveBlogItemHeader from './LiveBlogItemHeader'
import LiveBlogTopActions from './LiveBlogTopActions'
import Backdrop from './Backdrop'
import ReactDom from 'react-dom'

const GlobalStyles = createGlobalStyle`
  body {
    overflow: hidden;
  }
`

const lightbox = css`
  width: 640px;
  margin: 212px auto 40px auto;
`

const Wrapper = styled.div`
  ${({ showAsLightbox }) => (showAsLightbox ? lightbox : '')}
  position: relative;
  background-color: ${(props) => (props.pined ? '#fdf6ec' : '#fff')};
  margin-top: 40px;
`

const LiveBlogWrapper = styled.div`
  border: 1px solid #000;
  height: ${({ expanded }) => (expanded ? 'unset' : '479px')};
  min-height: ${({ expanded }) => (expanded ? '479px' : 'unset')};
  padding: 20px 128px 56px 128px;
`

const LiveBlog = styled.div`
  overflow: hidden;
  height: 100%;
`

export default function LiveBlogItem({ pined }) {
  const [expanded, setExpanded] = useState(false)
  const [showLightbox, setShowLightbox] = useState(false)

  useEffect(() => {
    if (showLightbox) {
      setExpanded(true)
    }
  }, [showLightbox])

  const expandClickedHandler = () => {
    setExpanded((expanded) => !expanded)
  }

  const showLightboxClickedHandler = () => {
    setShowLightbox((showLightbox) => !showLightbox)
  }

  const closeLighboxClickedHandler = () => {
    setShowLightbox(false)
  }

  let LiveBlogItem = (
    <Wrapper pined={pined} showAsLightbox={showLightbox}>
      <LiveBlogTopActions
        pined={pined}
        showLighbox={showLightboxClickedHandler}
      />
      <LiveBlogWrapper expanded={expanded}>
        <LiveBlog>
          <LiveBlogItemHeader />
          <LiveBlogItemContent />
        </LiveBlog>
      </LiveBlogWrapper>
      {!showLightbox && (
        <LiveBlogBottomActions
          onClick={expandClickedHandler}
          expanded={expanded}
        />
      )}
    </Wrapper>
  )

  if (showLightbox) {
    LiveBlogItem = ReactDom.createPortal(
      <Backdrop onClick={closeLighboxClickedHandler}>
        <GlobalStyles />
        {LiveBlogItem}
      </Backdrop>,
      document.getElementById('light-box-root')
    )
  }

  return <div>{LiveBlogItem}</div>
}
