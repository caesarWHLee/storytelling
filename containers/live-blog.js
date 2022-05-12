import { useState, useEffect } from 'react'
import useReferredState from '../hooks/useReferredState'
import Intro from '../components/Intro'
import LiveBlogControl from '../components/LiveBlogControl'
import LiveBlogItems from '../components/LiveBlogItems'
import LiveBlogWrapper from '../components/LiveBlogWrapper'

export default function LiveBlogContainr() {
  const [articles, setArticles] = useState([])
  const [pinedArticle, setPinedArticle] = useState({})
  const [showingArticles, showingArticlesRef, setShowingArticles] =
    useReferredState([])
  const [, hidingArticlesRef, setHidingArticles] = useReferredState([])
  const [, loadingRef, setLoading] = useReferredState(false)

  const getPinedArticle = (articles) => {
    const randomIndex = Math.random() * articles.length
    const articleToBePined = articles.splice(randomIndex, 1)[0]
    return articleToBePined
  }

  const loadMore = () => {
    const currentScrollingPoition =
      window.innerHeight + document.documentElement.scrollTop

    if (
      currentScrollingPoition === document.scrollingElement.scrollHeight &&
      !loadingRef.current &&
      hidingArticlesRef.current.length
    ) {
      const articlesToHide = [...hidingArticlesRef.current]
      const articlesToShow = [...showingArticlesRef.current].concat(
        articlesToHide.splice(0, 5)
      )
      console.log('articlesToShow', articlesToShow)
      console.log('articlesToHide', articlesToHide)

      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setShowingArticles(articlesToShow)
        setHidingArticles(articlesToHide)
      }, 1000)
    }
  }

  useEffect(() => {
    //fake fetch json data
    const articleData = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
      { id: 10 },
      { id: 11 },
    ]
    const articleToBePined = getPinedArticle(articleData)
    setArticles(articleData)
    setPinedArticle(articleToBePined)
  }, [])

  useEffect(() => {
    console.log(articles)
    if (articles.length) {
      const articlesToHide = [...articles]
      const articlesToShow = articlesToHide.splice(0, 4)
      setShowingArticles(articlesToShow)
      setHidingArticles(articlesToHide)
    }
  }, [articles, setHidingArticles, setShowingArticles])

  useEffect(() => {
    window.addEventListener('scroll', loadMore)
    return () => {
      window.removeEventListener('scroll', loadMore)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const orderChangedHandler = () => {
    setArticles((articles) => [...articles].reverse())
  }

  return (
    <LiveBlogWrapper>
      <Intro />
      <LiveBlogControl changeOrder={orderChangedHandler} />
      <LiveBlogItems articles={showingArticles} pinedArticle={pinedArticle} />
    </LiveBlogWrapper>
  )
}
