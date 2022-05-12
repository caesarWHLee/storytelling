import { useState } from 'react'
import styled from 'styled-components'
import LiveBlogBottomActions from './LiveBlogBottomActions'
import LiveBlogItemContent from './LiveBlogItemContent'
import LiveBlogItemHeader from './LiveBlogItemHeader'
import LiveBlogTopActions from './LiveBlogTopActions'

const Wrapper = styled.div`
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

  const expandClickedHandler = () => {
    setExpanded((expanded) => !expanded)
  }

  return (
    <Wrapper pined={pined}>
      <LiveBlogTopActions pined={pined} />
      <LiveBlogWrapper expanded={expanded}>
        <LiveBlog>
          <LiveBlogItemHeader />
          <LiveBlogItemContent />
        </LiveBlog>
      </LiveBlogWrapper>
      <LiveBlogBottomActions
        onClick={expandClickedHandler}
        expanded={expanded}
      />
    </Wrapper>
  )
}
