import Head from 'next/head'
import Link from 'next/link'
import Layout from 'components/Layout'
import {FeedType} from '../common';

export default function Home() {
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
