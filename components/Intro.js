import styled from 'styled-components'

const Wrapper = styled.div`
  padding-bottom: 40px;

  @media (max-width: 768px) {
    padding-bottom: 20px;
  }
`

const Title = styled.div`
  font-size: 28px;
  font-weight: 900;
  line-height: 41px;

  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 26px;
  }
`

const Description = styled.p`
  margin-top: 20px;
  font-size: 12px;
  line-height: 17px;
  text-align: justify;
`

const UpdateTime = styled.p`
  margin-top: 28px;
  text-align: center;
  font-weight: 900;
  font-size: 12px;
  transform: scale(calc(10 / 12));
  line-height: 14px;
`

export default function Intro() {
  return (
    <Wrapper>
      <Title>
        Liveblog
        標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題
      </Title>
      <Description>
        前言好好看讓他們是怎麼，位置一個前也好沒在，好好肺炎很喜歡成一家裡就到現在，會更種事情有很多，謝謝是今天其實，的話會。出貨的這個⋯到喜歡，啊我有這個去概也很感：的沒在是為比較好真的的時候，努力提早有很多底是阿阿⋯真可以呼分我還以用一兔要的。
        <br />
        <br />
        是本資那心情感謝，很死底是，為了一樣的不認的不，發現是家看雖然，過度？裡剛好了這樣？對過他直接表整活看來認親卡，所以就150字。
      </Description>
      <UpdateTime>最後更新時間：2022年2月22日 星期二 22:22</UpdateTime>
    </Wrapper>
  )
}
