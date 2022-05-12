import styled from 'styled-components'
import LiveBlogItem from './LiveBlogItem'

const Wrapper = styled.div`
  margin-top: 29px;
`

export default function LiveBlogItems(props) {
  return (
    <Wrapper>
      <LiveBlogItem pined article={props.pinedArticle} />
      {props.articles.map((article) => (
        <LiveBlogItem key={article.id} article={article} />
      ))}
    </Wrapper>
  )
}
