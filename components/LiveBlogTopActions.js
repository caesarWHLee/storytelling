import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: start;
`

const PinIconWrapper = styled.div`
  width: 44px;
  height: 44px;
  position: relative;
`

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 44px 44px 0 0;
  border-color: #000000 transparent transparent transparent;
`

const PinedIcon = styled.img`
  position: absolute;
  top: 5px;
  left: 6px;
`

const LightboxButton = styled.button`
  margin: 16px 16px 0 0;
`

export default function LiveBlogTopActions({ pined, showLighbox }) {
  return (
    <Wrapper>
      {pined ? (
        <PinIconWrapper>
          <Triangle />
          <PinedIcon src="/images/icon-pin-star.svg" alt="pined artile icon" />
        </PinIconWrapper>
      ) : (
        <div />
      )}

      <LightboxButton onClick={() => showLighbox()}>
        <img src="/images/icon-expand.svg" alt="expand article" />
      </LightboxButton>
    </Wrapper>
  )
}
