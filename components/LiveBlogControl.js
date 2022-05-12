import { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
`

const Divider = styled.div`
  position: absolute;
  left: calc((100% - 384px) / 2);
  width: 384px;
  height: 0;
  border: 2px solid #000;
`

const Control = styled.div`
  display: flex;
  align-items: center;
`

const ControlTitle = styled.div`
  display: inline-block;
  font-size: 12px;
  transform: scale(calc(10 / 12));
  line-height: 1;
  margin-right: 6px;
`

const ControlButton = styled.button`
  border: 1px solid #000;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  transform: ${(props) => (props.newToOld ? '' : 'rotate(180deg)')};
  background-color: transparent;
  cursor: pointer;
`

// const ControlItem

export default function LiveBlogControl() {
  const [newToOld, setNewToOld] = useState(false)

  return (
    <Wrapper>
      <div></div>
      <Divider />
      <Control>
        <ControlTitle>{newToOld ? '從新到舊' : '從舊到新'}</ControlTitle>
        <ControlButton
          onClick={() => setNewToOld((value) => !value)}
          newToOld={newToOld}
        >
          <img src="/images/icon-order.svg" alt="live blog order" />
        </ControlButton>
      </Control>
    </Wrapper>
  )
}
