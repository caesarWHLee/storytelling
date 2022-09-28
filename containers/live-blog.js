import { useState, useEffect, useRef } from 'react'
import moment from 'moment'

import Intro from '../components/Intro'
import LiveBlogControl from '../components/LiveBlogControl'
import LiveBlogItems from '../components/LiveBlogItems'
import LiveBlogWrapper from '../components/LiveBlogWrapper'

const initialShowingCount = 5

export default function LiveBlogContainr({ liveblog, fetchImageBaseUrl }) {
  const liveblogItemsRef = useRef([])
  const [boostedLiveblogItems, setBoostedLiveblogItems] = useState([])
  // showing means rendering non boosted liveblogItems
  const [showingCount, setShowingCount] = useState(initialShowingCount)
  const [showingLiveblogItems, setShowingLiveblogItems] = useState([])
  const [newToOld, setNewToOld] = useState(true)
  const loadingMoreRef = useRef(false)
  const firstLoaded = useRef(true)

  useEffect(() => {
    console.log(window.location.hash)
    if (window.location !== window.parent.location) {
      // The page is in an iframe
      console.log(
        'The page is in an iframe',
        document.referrer,
        document.location.href
      )
    } else {
      // The page is not in an iframe
      console.log('The page is not in an iframe')
    }
  })

  useEffect(() => {
    liveblogItemsRef.current = liveblog.liveblog_items
    const liveblogItemsToShow = liveblogItemsRef.current
      .filter((liveblogItem) => !liveblogItem.boost)
      .sort((a, b) => {
        const tsA = moment(a.publishTime).valueOf()
        const tsB = moment(b.publishTime).valueOf()
        return tsB - tsA
      })
    if (document.location.hash && firstLoaded.current) {
      const index = liveblogItemsToShow.findIndex(
        (liveblogItem) =>
          `#liveblog-item-${liveblogItem.id}` === document.location.hash
      )
      console.log(
        `index ${index} of liveblog `,
        liveblogItemsToShow[index],
        Math.ceil((index + 1) / 5) * 5
      )
      setShowingCount(Math.ceil((index + 1) / 5) * 5)
      firstLoaded.current = false
    }
  }, [liveblog])

  useEffect(() => {
    if (liveblog?.liveblog_items) {
      liveblogItemsRef.current = liveblog.liveblog_items

      const boostedLiveblogItems = liveblogItemsRef.current
        .filter((liveblogItem) => liveblogItem.boost)
        .sort((a, b) => {
          const tsA = moment(a.publishTime).valueOf()
          const tsB = moment(b.publishTime).valueOf()
          return newToOld ? tsB - tsA : tsA - tsB
        })

      const showingLiveblogItems = liveblogItemsRef.current
        .filter((liveblogItem) => !liveblogItem.boost)
        .sort((a, b) => {
          const tsA = moment(a.publishTime).valueOf()
          const tsB = moment(b.publishTime).valueOf()
          return newToOld ? tsB - tsA : tsA - tsB
        })
        .slice(0, showingCount)

      setBoostedLiveblogItems(boostedLiveblogItems)
      setShowingLiveblogItems(showingLiveblogItems)
      loadingMoreRef.current = false
    }
  }, [liveblog, newToOld, showingCount])

  // handle loadmore
  useEffect(() => {
    const loadMore = () => {
      const currentScrollingPoition =
        window.innerHeight + document.documentElement.scrollTop
      // loose comparison to prevent exact match not easy to trigger under some situation
      const reachEnd =
        currentScrollingPoition > document.scrollingElement.scrollHeight - 30
      const somethingLeftToShow =
        liveblogItemsRef.current.length -
          boostedLiveblogItems.length -
          showingLiveblogItems.length >
        0

      if (reachEnd && somethingLeftToShow && !loadingMoreRef.current) {
        loadingMoreRef.current = true
        setShowingCount((showingCount) => showingCount + 5)
      }
    }

    window.addEventListener('scroll', loadMore)
    return () => {
      window.removeEventListener('scroll', loadMore)
    }
  }, [boostedLiveblogItems, showingLiveblogItems])

  return (
    <LiveBlogWrapper>
      <Intro
        intro={{
          title: liveblog?.name,
          description: liveblog?.desc,
          time: liveblog?.updatedAt ? liveblog?.updatedAt : liveblog?.createdAt,
        }}
      />
      <LiveBlogControl
        newToOld={newToOld}
        onChangeOrder={() => {
          setNewToOld((value) => !value)
          setShowingCount(initialShowingCount)
        }}
      />
      <LiveBlogItems
        articles={showingLiveblogItems}
        pinedArticles={boostedLiveblogItems}
        fetchImageBaseUrl={fetchImageBaseUrl}
      />
    </LiveBlogWrapper>
  )
}
