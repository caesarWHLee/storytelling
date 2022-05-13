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

  @media (max-width: 768px) {
    width: unset;
    margin: 157px 16px 40px 16px;
  }
`

const Wrapper = styled.div`
  position: relative;
  background-color: ${(props) => (props.pined ? '#fdf6ec' : '#fff')};
  margin-top: 40px;

  @media (max-width: 768px) {
    margin-top: 28px;
  }
  ${({ showAsLightbox }) => (showAsLightbox ? lightbox : '')}
`

const LiveBlogWrapper = styled.div`
  border: 1px solid #000;
  padding: 20px 128px 56px 128px;

  @media (max-width: 768px) {
    padding: 28px 12px 56px 12px;
  }
`

const LiveBlog = styled.div`
  overflow: hidden;
  height: 100%;
`

export default function LiveBlogItem({ pined, article }) {
  const [expanded, setExpanded] = useState(false)
  const [showAsLightbox, setShowAsLightbox] = useState(false)

  useEffect(() => {
    if (showAsLightbox) {
      setExpanded(true)
    }
  }, [showAsLightbox])

  const expandClickedHandler = () => {
    setExpanded((expanded) => !expanded)
  }

  const showLightboxClickedHandler = () => {
    setShowAsLightbox((showLightbox) => !showLightbox)
  }

  const closeLighboxClickedHandler = () => {
    setShowAsLightbox(false)
  }

  let LiveBlogItem = (
    <Wrapper
      pined={pined}
      showAsLightbox={showAsLightbox}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <LiveBlogTopActions
        pined={pined}
        showLightbox={showLightboxClickedHandler}
        showAsLightbox={showAsLightbox}
      />
      <LiveBlogWrapper>
        <LiveBlog>
          <LiveBlogItemHeader article={article} />
          <LiveBlogItemContent article={article} expanded={expanded} />
        </LiveBlog>
      </LiveBlogWrapper>
      {!showAsLightbox && (
        <LiveBlogBottomActions
          onClick={expandClickedHandler}
          expanded={expanded}
        />
      )}
    </Wrapper>
  )

  if (showAsLightbox) {
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
