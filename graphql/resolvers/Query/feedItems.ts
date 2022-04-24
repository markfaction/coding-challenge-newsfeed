import {FeedPage} from '../../../common/types';
import FellowShipEventsLoader from 'graphql/core/Events/FellowshipEventsLoader';
import getEventsLoaderForGivenFeedType from './../../core/Events/eventsLoadingStrategy';

type Args = {
  feedType: string;
  offSet: number;
  limit: number;
}

export default async function feedItems(parent: unknown, {feedType, offSet, limit}: Args): Promise<FeedPage> {
    const feedItemsLoader = new FellowShipEventsLoader(getEventsLoaderForGivenFeedType(feedType));
    const feedItemList = await feedItemsLoader.getEventsSortedByNewestFirst();

    let feedPageResult: FeedPage = {
      hasNext: false,
      list: [],
    };

    // Serve paginated results if offSet and limit params have been set
    if(offSet != undefined && limit != undefined) {
      feedPageResult = {
        hasNext: (feedItemList.length >= (offSet + limit)),
        list: feedItemList.slice(offSet, (offSet + limit)),
      }
    }
    // else return all records
    else {
      feedPageResult = {
        hasNext: false,
        list: feedItemList,
      }
    }

    return feedPageResult;
  }
