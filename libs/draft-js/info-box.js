import React from 'react'

export function InfoBoxBlock(props) {
  const { block, contentState } = props
  const entityKey = block.getEntityAt(0)
  const entity = contentState.getEntity(entityKey)
  const { title, body } = entity.getData()

  return (
    <React.Fragment>
      <div
        style={{
          backgroundColor: '#F5F4F3',
          padding: '30px',
          position: 'relative',
        }}
      >
        <h2>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </React.Fragment>
  )
}
