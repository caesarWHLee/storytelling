import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Editor, EditorState, convertFromRaw } from 'draft-js'

function convertTableDataFromRaw(rawTableData) {
  return rawTableData.map((rowData) => {
    return rowData.map((colData) => {
      const contentState = convertFromRaw(colData)
      return EditorState.createWithContent(contentState)
    })
  })
}

const StyledTable = styled.div`
  display: table;
  width: 95%;
  border-collapse: collapse;
`

const StyledTr = styled.div`
  display: table-row;
`

const StyledTd = styled.div`
  display: table-cell;
  border: 1px solid #e1e5e9;
  min-width: 100px;
  min-height: 40px;
  padding: 10px;
`

const TableBlockContainer = styled.div`
  margin: 15px 0;
  position: relative;
  overflow: scroll;
  padding: 15px;
`

export const TableBlock = (props) => {
  const { block, contentState } = props
  const entityKey = block.getEntityAt(0)
  const entity = contentState.getEntity(entityKey)
  const { tableData: rawTableData } = entity.getData()
  const [tableData] = useState(convertTableDataFromRaw(rawTableData))
  const tableRef = useRef(null)

  return (
    <TableBlockContainer>
      <StyledTable key={entityKey} ref={tableRef}>
        {tableData.map((rowData, rIndex) => {
          const colsJsx = rowData.map((colData, cIndex) => {
            return (
              <StyledTd key={`col_${cIndex}`}>
                {/* TODO: add editor buttons if needed */}
                <Editor editorState={colData} readOnly />
              </StyledTd>
            )
          })
          return (
            <React.Fragment key={`row_${rIndex}`}>
              <StyledTr>{colsJsx}</StyledTr>
            </React.Fragment>
          )
        })}
      </StyledTable>
    </TableBlockContainer>
  )
}
