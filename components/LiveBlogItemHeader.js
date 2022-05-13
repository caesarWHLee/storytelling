import styled from 'styled-components'
import moment from 'moment'

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

  @media (max-width: 768px) {
    align-items: start;
    flex-direction: column;
  }
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

  @media (max-width: 768px) {
    display: none;
  }
`
const PublisherName = styled.span`
  margin-left: 8px;
  display: inline-block;
  font-size: 12px;
  font-weight: 900;
  line-height: 17px;

  @media (max-width: 768px) {
    margin-left: unset;
  }
`

const PublishDate = styled.div`
  font-size: 12px;
  transform: scale(calc(10 / 12));
  font-weight: 900;
  line-height: 14px;

  @media (max-width: 768px) {
    position: relative;
    left: -6%;
    margin-top: 4px;
  }
`

moment.locale('zh-tw', {
  weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
})

export default function LiveBlogItemHeader({ article }) {
  return (
    <div>
      <div>
        {article.tags.map((tag) => (
          <Category key={tag}>{tag}</Category>
        ))}
      </div>
      <PublishInfoWrapper>
        <PublisherWrapper>
          <PublisherAvatar />
          <PublisherName>{article.author || 'No Name'}</PublisherName>
        </PublisherWrapper>
        <PublishDate>
          {moment(article.publishTime)
            .locale('zh_tw')
            .format('YYYY年MM月DD日 dddd HH:mm')}
        </PublishDate>
      </PublishInfoWrapper>
    </div>
  )
}
