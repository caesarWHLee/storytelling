import styled from 'styled-components'

const Category = styled.span`
  font-weight: 900;
  font-size: 12px;
  transform: scale(calc(10 / 12));
  line-height: 14px;
  margin-right: 8px;
  color: #999;
`

const PublishInfoWrapper = styled.div`
  margin-top: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const PublisherWrapper = styled.div`
  display: flex;
  align-items: center;
`

const PublisherAvatar = styled.span`
  display: inline-block;
  width: 36px;
  height: 36px;
  background: #c4c4c4;
  border: 1px solid #000000;
  border-radius: 50%;
`
const PublisherName = styled.span`
  margin-left: 8px;
  display: inline-block;
  font-size: 12px;
  font-weight: 900;
  line-height: 17px;
`

const PublishDate = styled.div`
  font-size: 12px;
  transform: scale(calc(10 / 12));
  font-weight: 900;
  line-height: 14px;
`

export default function LiveBlogItemHeader() {
  return (
    <div>
      <div>
        <Category>疫情</Category>
        <Category>烏克蘭戰爭</Category>
      </div>
      <PublishInfoWrapper>
        <PublisherWrapper>
          <PublisherAvatar />
          <PublisherName>記者姓名</PublisherName>
        </PublisherWrapper>
        <PublishDate>2022年2月22日 星期二 22:22</PublishDate>
      </PublishInfoWrapper>
    </div>
  )
}
