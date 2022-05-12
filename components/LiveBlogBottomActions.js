import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ExpandButton = styled.button`
  color: #999;
  font-size: 12px;
  font-weight: 700;
  line-height: 17.38px;
  text-decoration: underline;

  &:hover,
  &:active {
    color: #000;
  }
`

export default function LiveBlogBottomActions({ onClick, expanded }) {
  return (
    <Wrapper>
      <ExpandButton onClick={() => onClick()}>
        {expanded ? '顯示較少' : '繼續閱讀'}
      </ExpandButton>
    </Wrapper>
  )
}
