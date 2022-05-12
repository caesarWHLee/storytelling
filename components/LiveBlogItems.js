import styled from 'styled-components'
import LiveBlogItem from './LiveBlogItem'

const Wrapper = styled.div`
  margin-top: 29px;
`

export default function LiveBlogItems() {
  return (
    <Wrapper>
      {[1, 2, 3].map((e) => (
        <LiveBlogItem key={e} pined={e === 1} />
      ))}
    </Wrapper>
  )
}
