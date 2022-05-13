import React from 'react'

const styles = {
  buttons: {
    marginBottom: 10,
    display: 'flex',
  },
  urlInputContainer: {
    marginBottom: 10,
  },
  urlInput: {
    fontFamily: "'Georgia', serif",
    marginRight: 10,
    padding: 3,
  },
  button: {
    marginTop: '10px',
    marginRight: '10px',
    cursor: 'pointer',
  },
  media: {
    width: '100%',
  },
}

const Audio = (props) => {
  return <audio controls src={props.src} style={styles.media} />
}

const Image = (props) => {
  return <img src={props.src} style={styles.media} alt="" />
}

const Video = (props) => {
  return <video controls src={props.src} style={styles.media} />
}

export const MediaBlock = (entity) => {
  const { src } = entity.getData()
  const type = entity.getType()

  let media
  if (type === 'audioLink') {
    media = <Audio src={src} />
  } else if (type === 'imageLink') {
    // eslint-disable-next-line jsx-a11y/alt-text
    media = <Image src={src} />
  } else if (type === 'videoLink') {
    media = <Video src={src} />
  }

  return media
}
