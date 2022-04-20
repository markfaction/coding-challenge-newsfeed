import {FeedItem} from '../../../common/types';
import {FeedType} from '../../../common/enums';
import AngelEventsLoadingStrategy from 'graphql/core/Events/AngelEventsLoadingStrategy';
import FounderEventsLoadingStrategy from 'graphql/core/Events/FounderEventsLoadingStrategy';
import WriterEventsLoadingStrategy from 'graphql/core/Events/WriterEventsLoadingStrategy';
import FellowShipEventsLoader from 'graphql/core/Events/FellowshipEventsLoader';
import IEventsLoadingStrategy from 'graphql/core/Events/interfaces/IEventsLoadingStrategy';

type Args = {
  feedType: string;
}

const getEventsLoaderForGivenFeedType = (feedType: string): IEventsLoadingStrategy => {
    switch(feedType) {
        case FeedType.Angel: {
            return new AngelEventsLoadingStrategy();
        }
        case FeedType.Founder: {
            return new FounderEventsLoadingStrategy();
        }
        case FeedType.Writer: {
            return new WriterEventsLoadingStrategy();
        }
        default: {
            throw 'Not a valid news feed type';
        }
    }
}

export default async function feedItems(parent: unknown, {feedType}: Args): Promise<FeedItem[]> {
    
    const feedItemsLoader = new FellowShipEventsLoader(getEventsLoaderForGivenFeedType(feedType));
    const feedItems = feedItemsLoader.getEventsSortedByNewestFirst();
    return feedItems;

    //const feedItems: FeedItem[] = [];
    // feedItems.push({
    //     id: 2222,
    //     created: new Date('12.4.2022'),
    //     type: 'user',
    //     value: {
    //         id: 1,
    //         name: "Test User",
    //         bio: "Test Bio",
    //         fellowship: "angels",
    //         avatar_url: "",
    //         projects: [],
    //     }
    // });
    
    // feedItems.push({
    //     id: 2244,
    //     created: new Date('1.4.2022'),
    //     type: 'project',
    //     value: {
    //         id: 3,
    //         name: "Test Project",
    //         description: "Test Description",
    //         icon_url: "",
    //         users: [],
    //     }
    // });
    
    // feedItems.push({
    //     id: 789,
    //     created: new Date('2.4.2022'),
    //     type: 'announcement',
    //     value: {
    //         id: 5,
    //         fellowship: 'all',
    //         title: 'Test Announcement',
    //         body: 'This is a public announcement',
    //     }
    // });

    //return feedItems
  }
