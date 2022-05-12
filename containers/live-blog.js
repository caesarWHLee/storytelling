import Intro from '../components/Intro'
import LiveBlogControl from '../components/LiveBlogControl'
import LiveBlogWrapper from '../components/LiveBlogWrapper'

export default function LiveBlogContainr() {
  return (
    <LiveBlogWrapper>
      <Intro />
      <LiveBlogControl />
    </LiveBlogWrapper>
  )
}
