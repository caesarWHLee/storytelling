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

/*
<LiveBlogWrapper>
<LiveBlogItemsWrapper>
  <LiveBlogControl />
  <LiveBlogItems>
    <PinedLiveBlog />
    <LiveBlogItemWrapper>
      <LiveBlogItem>
        <LiveBlogControl />
        <LiveBlogMeta>
          <div>Tags</div>
          <div>
            <div>
              <img />
              <span>記者名字</span>
            </div>
            <div>
              <span>日期</span>
            </div>
          </div>
        </LiveBlogMeta>
        <LiveBlogArticle>
          <div>Title</div>
          <div>Article...</div>
          with collapse state
        </LiveBlogArticle>
        <LiveBlog></LiveBlog>
      </LiveBlogItem>
    </LiveBlogItemWrapper>
  </LiveBlogItems>
</LiveBlogItemsWrapper>
</LiveBlogWrapper>
*/
