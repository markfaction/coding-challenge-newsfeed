import { useRouter } from "next/router";
import {useQuery, gql} from '@apollo/client';
import {User, Project, Announcement, FeedItem} from '../../common/types';
import Layout from '../../components/Layout';
import UserCard from '../../components/UserCard';
import ProjectCard from '../../components/ProjectCard';
import AnnouncementCard from '../../components/AnnouncementCard';


const FEED_ITEMS_QUERY = gql`
  query feedItems($feedType: String!) {
    feedItems(feedType: $feedType) {
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
`




// Return the correct card to be rendered, based on the feed item type
const displayFeedItems = (feedItems: Array<FeedItem>) => {
    if(feedItems && feedItems.length > 0) {
        return feedItems.map(item => {
            switch(item.type) {
                case 'user': {
                    return <UserCard key={item.id} user={item.value as User} />
                    break;
                }
                case 'project': {
                    return <ProjectCard key={item.id} project={item.value as Project} />
                    break;
                }
                case 'announcement': {
                    return <AnnouncementCard key={item.id} announcement={item.value as Announcement} />
                    break;
                }
                default: {
                    return <h3>Invalid feed item type</h3>;
                }
            }
        });
    }
}


export default function NewsFeed() {
    const feedTypeValue = useRouter().query.type;

    const {data, error, loading} = useQuery(
        FEED_ITEMS_QUERY,
        {
          variables: {feedType: feedTypeValue},
        }
      );
    
    
    const feedItems = data?.feedItems;

    
    if (!feedItems || loading || error) {
        return null;
    }


    return <>
        <h1>News Feed type received: {feedTypeValue}</h1>
        <Layout>
            {displayFeedItems(feedItems)}
        </Layout>
    </>
}


