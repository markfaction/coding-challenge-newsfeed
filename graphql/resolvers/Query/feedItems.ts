import {FeedItem} from '../../../common/types';
import {FeedType} from '../../../common/enums';

type Args = {
  feedType: string;
}

export default async function feedItems(parent: unknown, {feedType}: Args): Promise<FeedItem[]> {
    const feedItems: FeedItem[] = [];
    feedItems.push({
        id: 2222,
        created: new Date('12.4.2022'),
        type: 'user',
        value: {
            id: 1,
            name: "Test User",
            bio: "Test Bio",
            fellowship: "angels",
            avatar_url: "",
            projects: [],
        }
    });
    
    feedItems.push({
        id: 2244,
        created: new Date('1.4.2022'),
        type: 'project',
        value: {
            id: 3,
            name: "Test Project",
            description: "Test Description",
            icon_url: "",
            users: [],
        }
    });
    
    feedItems.push({
        id: 789,
        created: new Date('2.4.2022'),
        type: 'announcement',
        value: {
            id: 5,
            fellowship: 'all',
            title: 'Test Announcement',
            body: 'This is a public announcement',
        }
    });

    return feedItems
  }
