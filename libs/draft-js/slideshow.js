import React from 'react'

const styles = {
  image: {
    width: '100%',
  },
  slideshow: {
    moreBt: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      borderRadius: '100%',
      border: 'black 1px solid',
      transform: 'translate(-50%, -50%)',
      padding: '10px',
      backgroundColor: 'white',
    },
  },
  buttons: {
    marginBottom: 10,
    display: 'flex',
  },
  button: {
    marginTop: '10px',
    marginRight: '10px',
    cursor: 'pointer',
  },
}

export function SlideshowBlock(entity) {
  const images = entity.getData()
  return (
    <figure style={{ position: 'relative' }}>
      <img
        src={images?.[0]?.resized?.original}
        style={styles.image}
        onError={(e) => (e.currentTarget.src = images?.[0]?.imageFile?.url)}
        alt=""
      />
      <div style={styles.slideshow.moreBt}>+{images.length}</div>
    </figure>
  )
}
