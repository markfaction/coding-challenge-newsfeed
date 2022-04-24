import Head from 'next/head'
import Link from 'next/link'
import Layout from 'components/Layout'
import {FeedType} from '../common/enums';
import { useApolloClient } from '@apollo/client';
import { useEffect } from 'react';

export default function Home() {

  const apolloClientCache = useApolloClient().cache;

  useEffect(() => {  
    //TODO: Need to evict the specific FeedItems loaded and call cache.gc
    // Currently evicting whole cache as only feed items are cached in this POC
    apolloClientCache.evict({});
  }, []);

  return (
    <Layout>
      <Head>
        <title>On Deck Newsfeed</title>
      </Head>
      <h1>Hello there!</h1>
      <span>Select relevant newsfeed to view:</span>
       <ul>
        <li><Link href={{
          pathname: '/newsfeed/feed',
          query: {type: FeedType.Founder},
        }}>Go to founders newsfeed</Link></li>

        <li><Link href={{
          pathname: '/newsfeed/feed',
          query: {type: FeedType.Angel},
        }}>Go to angels newsfeed</Link></li>

        <li><Link href={{
          pathname: '/newsfeed/feed',
          query: {type: FeedType.Writer},
        }}>Go to writers newsfeed</Link></li>
      </ul>
    </Layout>
  )
}
