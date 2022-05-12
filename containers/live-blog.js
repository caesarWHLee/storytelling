import Intro from '../components/Intro'
import LiveBlogControl from '../components/LiveBlogControl'
import LiveBlogItems from '../components/LiveBlogItems'
import LiveBlogWrapper from '../components/LiveBlogWrapper'

export default function LiveBlogContainr() {
  return (
    <LiveBlogWrapper>
      <Intro />
      <LiveBlogControl />
      <LiveBlogItems />
    </LiveBlogWrapper>
  )
}
