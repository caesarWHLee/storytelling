import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import { JumbotronContainer } from '../../containers/jumbotron'
import LiveBlogContainr from '../../containers/live-blog'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #fff1db;
  }
`

export default function LiveBlog({
  initialLiveblog,
  fetchLiveblogUrl,
  fetchImageBaseUrl,
}) {
  const [liveblog, setLiveblog] = useState(initialLiveblog)
  const intervalIdRef = useRef()

  useEffect(() => {
    const onPostMessage = (e) => {
      console.log('got post message', e)
    }
    window.addEventListener('message', onPostMessage)
    return () => {
      window.removeEventListener('message', onPostMessage)
    }
  }, [])

  useEffect(() => {
    const fetchLiveblog = async (url) => {
      try {
        console.log(url)
        const response = await axios.get(url)

        if (response?.data) {
          setLiveblog(response.data)
        }
      } catch (error) {
        console.error('Fetching liveblog with error', error)
      }
    }

    if (fetchLiveblogUrl) {
      if (!initialLiveblog) {
        fetchLiveblog(fetchLiveblogUrl)
      }
      intervalIdRef.current = setInterval(() => {
        fetchLiveblog(fetchLiveblogUrl)
      }, 60000)
    }

    return () => {
      clearInterval(intervalIdRef.current)
    }
  }, [fetchLiveblogUrl, initialLiveblog])

  if (!fetchLiveblogUrl) return <p>Please asign liveblog slug name</p>

  return (
    <>
      <div id="light-box-root" />
      <GlobalStyles />
      {liveblog?.heroImage && (
        <JumbotronContainer
          image={{
            name: liveblog.heroImage.name,
            url: fetchImageBaseUrl + liveblog.heroImage.imageFile.url,
          }}
        />
      )}
      <LiveBlogContainr
        liveblog={liveblog}
        fetchImageBaseUrl={fetchImageBaseUrl}
      />
    </>
  )
}

export async function getServerSideProps({ query }) {
  let liveblogFileName = query.liveblog
  let initialLiveblog = null
  let fetchLiveblogUrl = ''
  let fetchImageBaseUrl = ''
  const gcsBucketBaseUrl = process.env.GCS_BUCKET_URL
    ? process.env.GCS_BUCKET_URL
    : ''

  console.log(liveblogFileName, gcsBucketBaseUrl)
  if (liveblogFileName) {
    liveblogFileName = liveblogFileName + '.json'
    fetchImageBaseUrl = gcsBucketBaseUrl
    fetchLiveblogUrl = gcsBucketBaseUrl + '/files/liveblogs/' + liveblogFileName
    console.log(
      JSON.stringify({
        severity: 'DEBUG',
        message: `SSR get liveblog json in ${fetchLiveblogUrl}`,
      })
    )
    try {
      const response = await axios.get(fetchLiveblogUrl, { timeout: 2000 })
      if (response?.data) {
        console.log(
          JSON.stringify({
            severity: 'DEBUG',
            message: `SSR successfully get liveblog json, ${JSON.stringify(
              response.data
            )}`,
          })
        )
        initialLiveblog = response.data
      }
    } catch (error) {
      console.log(
        JSON.stringify({ severity: 'DEBUG', message: JSON.stringify(error) })
      )
      console.log(
        JSON.stringify({
          severity: 'ERROR',
          message: new Error(
            `axios fetch ${fetchLiveblogUrl} failed, ${error.message}`
          ).stack,
        })
      )
    }
  }

  return { props: { initialLiveblog, fetchLiveblogUrl, fetchImageBaseUrl } }
}
