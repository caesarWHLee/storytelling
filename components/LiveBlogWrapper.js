import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 20px auto;
  width: 640px;

  @media (max-width: 768px) {
    margin: 20px 16px;
    width: unset;
  }
`

export default function LiveBlogWrapper(props) {
  return <Wrapper>{props.children}</Wrapper>
}
