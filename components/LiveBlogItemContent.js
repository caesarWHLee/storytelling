import styled from 'styled-components'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import decorators from '../libs/draft-js/entity-decorator'
import { atomicBlockRenderer } from '../libs/draft-js/block-redender-fn'

// to be separate
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
}
const blockRendererFn = (block) => {
  const atomicBlockObj = atomicBlockRenderer(block)
  return atomicBlockObj
}

const getBlockStyle = (block) => {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote'

    default:
      return null
  }
}

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
`

export default function LiveBlogItemContent({ article }) {
  const contentState = convertFromRaw(article.name)
  const editorState = EditorState.createWithContent(contentState, decorators)

  return (
    <Wrapper>
      <Title>{article.title}</Title>
      <HeroImageWrapper>
        <img src="/images/hero-image-1.png" alt="hero image" />
        <HeroImageCaption>
          圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說
        </HeroImageCaption>
      </HeroImageWrapper>
      <DraftEditorWrapper>
        <Editor
          editorState={editorState}
          readOnly
          customStyleMap={styleMap}
          blockRendererFn={blockRendererFn}
          blockStyleFn={getBlockStyle}
        />
      </DraftEditorWrapper>
    </Wrapper>
  )
}
