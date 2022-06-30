import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

import { JumbotronContainer } from '../../containers/jumbotron'
import LiveBlogContainr from '../../containers/live-blog'
import { createGlobalStyle } from 'styled-components'
import {
  getLiveblogFetchUrl,
  getLiveblogImageUrl,
} from '../../utils/gcs/fetchConfig'

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #fff1db;
  }
`

export default function LiveBlog({ initialLiveblog }) {
  const router = useRouter()
  const [liveblog, setLiveblog] = useState(initialLiveblog)
  const intervalIdRef = useRef()

  useEffect(() => {
    const fetchLiveblog = async (url) => {
      try {
        const response = await axios.get(url)

        if (response?.data) {
          setLiveblog(response.data)
        }
      } catch (error) {
        console.error('Fetching liveblog with error', error)
      }
    }

    if (router.query.liveblog) {
      const liveblogFileName = router.query.liveblog + '.json'
      const fetchUrl = getLiveblogFetchUrl(liveblogFileName)

      intervalIdRef.current = setInterval(() => {
        fetchLiveblog(fetchUrl)
      }, 60000)
    }

    return () => {
      clearInterval(intervalIdRef.current)
    }
  }, [router.query.liveblog])

  return (
    <>
      <div id="light-box-root" />
      <GlobalStyles />
      {liveblog?.heroImage && (
        <JumbotronContainer
          image={{
            name: liveblog.heroImage.name,
            url: getLiveblogImageUrl(liveblog.heroImage.imageFile.url),
          }}
        />
      )}
      <LiveBlogContainr liveblog={liveblog} />
    </>
  )
}

export async function getServerSideProps({ query }) {
  let liveblogFileName = query.liveblog
  let initialLiveblog
  if (liveblogFileName) {
    liveblogFileName = liveblogFileName + '.json'
    const fetchUrl = getLiveblogFetchUrl(liveblogFileName)
    try {
      const response = await axios.get(fetchUrl)
      if (response?.data) {
        initialLiveblog = response.data
      }
    } catch (error) {
      console.error('Fetching liveblog with error', error)
    }
  }

  return { props: { initialLiveblog } }
}
