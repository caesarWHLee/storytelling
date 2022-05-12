import styled from 'styled-components'

const BackdropItem = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: scroll;
  z-index: 10;
  background: rgba(0, 0, 0, 0.75);
`

export default function Backdrop(props) {
  return (
    <BackdropItem onClick={() => props.onClick()}>
      {props.children}
    </BackdropItem>
  )
}
