import { useRouter } from "next/router";
import {useEffect, useState} from 'react';
import {useQuery, gql} from '@apollo/client';
import Link from 'next/link';
import {User, Project, Announcement, FeedItem} from '../../common/types';
import Layout from '../../components/Layout';
import UserCard from '../../components/UserCard';
import ProjectCard from '../../components/ProjectCard';
import AnnouncementCard from '../../components/AnnouncementCard';
import { FEED_ITEM_TYPE } from "common/constants/feedItemType";

const PAGE_SIZE_LIMIT: number = 5;

const FEED_ITEMS_QUERY = gql`
  query feedItems($feedType: String!, $offSet: Int, $limit: Int) {
    feedItems(feedType: $feedType, offSet: $offSet, limit: $limit) {
      hasNext
      list {
        id
        created
        type
        value {
          __typename
          ... on User {
              id
              name
              bio
              fellowship
              avatar_url
              projects {
                id
                name
                icon_url
              }
          }
          ... on Project {
              id
              name
              description
              icon_url
              users {
                id
                name
                avatar_url
              }
          }
          ... on Announcement {
              id
              fellowship
              title
              body
          }
        }
      }
    }
  }
`

// Return the correct card to be rendered, based on the feed item type
const displayFeedItems = (feedItems: Array<FeedItem>) => {
    if(feedItems && feedItems.length > 0) {
        return feedItems.map(item => {
            switch(item.type) {
                case FEED_ITEM_TYPE.USER: {
                    return <UserCard key={item.id} user={item.value as User} />
                }
                case FEED_ITEM_TYPE.PROJECT: {
                    return <ProjectCard key={item.id} project={item.value as Project} />
                }
                case FEED_ITEM_TYPE.ANNOUNCEMENT: {
                    return <AnnouncementCard key={item.id} announcement={item.value as Announcement} />
                }
                default: {
                    return <h3>Invalid feed item type</h3>;
                }
            }
        });
    }
}


export default function NewsFeed() {
  
  const [pageOffSet, setPageOffSet] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const feedTypeValue = useRouter().query.type;

  const {data, error, loading, fetchMore} = useQuery(
      FEED_ITEMS_QUERY,
      {
        variables: {feedType: feedTypeValue, offSet: pageOffSet, limit: PAGE_SIZE_LIMIT},
      }
    );

  const paginatedFeedItems: FeedItem[] = data?.feedItems.list;
    
  if (!paginatedFeedItems || loading || error) {
      return null;
  }

  const haveMoreRecordsToLoad = data?.feedItems?.hasNext;

  const handleScroll = () => {
    if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && haveMoreRecordsToLoad) {
      const newPageOffSet = pageOffSet + PAGE_SIZE_LIMIT;
      fetchMore({
        variables: {
          offSet: newPageOffSet
        },
      });
      setPageOffSet(newPageOffSet);
    }
  };

  return <div>
      <h1>News feed for: {feedTypeValue}</h1>
        <Link href={{
          pathname: '/',
          query: {},
        }}>Back To Home Page</Link>
        <Layout >
            {displayFeedItems(paginatedFeedItems)}
        </Layout>
    </div>
}


