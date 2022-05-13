import { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import DraftRenderer from './DraftRenderer'

const Wrapper = styled.div`
  margin-top: 16px;

  @media (max-width: 768px) {
    margin-top: 8px;
  }
`

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 34.75px;

  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 26px;
  }
`

const HeroImageWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  position: relative;

  img {
    width: 100%;
    display: block;
  }
`

const HeroImageCaption = styled.div`
  position: relative;
  margin-top: 4px;
  width: 133%;
  left: -16.65%;
  font-size: 12px;
  font-weight: 400;
  transform: scale(calc(9 / 12));
  line-height: 13px;
  color: #999;
`

const DraftEditorWrapper = styled.div`
  margin-top: 20px;
  overflow: hidden;
  height: ${({ expanded, height }) => (expanded ? 'unset' : `${height}px`)};
  min-height: ${({ expanded, height }) => (expanded ? `${height}px` : 'unset')};
`

// 5 lines of normal text
const defaultContentHeight = 87.5

export default function LiveBlogItemContent({ article, expanded }) {
  const targetRef = useRef()
  const [contentHeight, setContentHeight] = useState(defaultContentHeight)

  useEffect(() => {
    if (targetRef.current) {
      /*
      to limit the displaying contents' height not greater than defaultContentHeight
      loop over draftjs contentBlock to check if accumulation of heights exceeds defaultContentHeight 
      use accumulation of heights to prevent words cut in the middle
      if 
      */
      console.log(targetRef.current)
      const contentBlocks = [
        ...targetRef.current.querySelectorAll('[data-block="true"]'),
      ]

      let accumulationHeight = 0
      let lastMarginBottom = 0

      contentBlocks.every((contentBlock) => {
        let height = contentBlock.clientHeight
        const style = getComputedStyle(contentBlock)
        let marginTop = parseInt(style.marginTop)
        if (lastMarginBottom) {
          // prevent double counting margin since margin collapses
          marginTop =
            lastMarginBottom > marginTop ? 0 : lastMarginBottom - marginTop
        }
        let marginBottom = parseInt(style.marginBottom)
        lastMarginBottom = marginBottom

        height += marginTop
        height += marginBottom
        accumulationHeight += height
        return accumulationHeight > defaultContentHeight ? false : true
      })
      setContentHeight(accumulationHeight)
    }
  }, [])

  return (
    <Wrapper>
      <Title>{article.title}</Title>
      <HeroImageWrapper>
        <img src="/images/hero-image-1.png" alt="hero image" />
        <HeroImageCaption>
          圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說
        </HeroImageCaption>
      </HeroImageWrapper>
      <DraftEditorWrapper
        expanded={expanded}
        ref={targetRef}
        height={contentHeight}
      >
        <DraftRenderer rawContentBlock={article.name} />
      </DraftEditorWrapper>
    </Wrapper>
  )
}
