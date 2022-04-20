import styled from 'styled-components'
import Card from './Card'
import Markdown from './Markdown'
import {Announcement} from '../common/types';

type Props = {
    announcement: Announcement;
  }

export default function AnnouncementCard({announcement}: Props) {
  return (
    <Card>
      <Columns>
        <ColumnRight>
          <h2>Announcement to {announcement.fellowship}</h2>
          <h1>{announcement.title}</h1>
          <Markdown>{announcement.body}</Markdown>
        </ColumnRight>
      </Columns>
    </Card>
  )
}


const Icon = styled.img`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 21rem;
`

const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 14rem;
`