import {FeedItem} from '../../../common/types';
import FellowShipEventsLoader from 'graphql/core/Events/FellowshipEventsLoader';
import getEventsLoaderForGivenFeedType from './../../core/Events/eventsLoadingStrategy';

type Args = {
  feedType: string;
}

export default async function feedItems(parent: unknown, {feedType}: Args): Promise<FeedItem[]> {
    const feedItemsLoader = new FellowShipEventsLoader(getEventsLoaderForGivenFeedType(feedType));
    const feedItems = await feedItemsLoader.getEventsSortedByNewestFirst();
    return feedItems;
  }
