import { JumbotronContainer } from '../containers/jumbotron'
import LiveBlogContainr from '../containers/live-blog'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #fff1db;
  }
`

export default function Home() {
  return (
    <>
      <GlobalStyles />
      <JumbotronContainer />
      <LiveBlogContainr />
    </>
  )
}
