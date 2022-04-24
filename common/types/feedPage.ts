import { FeedItem } from './feedItem';

export type FeedPage = {
    hasNext: Boolean;
    list: FeedItem[];
}