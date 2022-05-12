import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 20px auto 0 auto;
  width: 640px;
`

export default function LiveBlogWrapper(props) {
  return <Wrapper>{props.children}</Wrapper>
}
