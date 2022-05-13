import React from 'react'

const styles = {
  link: {
    color: '#3b5998',
    textDecoration: 'underline',
  },
  button: {
    marginTop: '10px',
    marginRight: '10px',
    cursor: 'pointer',
  },
  urlInput: {
    fontFamily: "'Georgia', serif",
    marginRight: 10,
    padding: 10,
  },
}

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity()
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    )
  }, callback)
}

export const linkDecorator = {
  strategy: findLinkEntities,
  component: Link,
}

function Link(props) {
  const { url } = props.contentState.getEntity(props.entityKey).getData()
  return (
    <a href={url} style={styles.link}>
      {props.children}
    </a>
  )
}
