import AngelEventsLoadingStrategy from './AngelEventsLoadingStrategy';
import FounderEventsLoadingStrategy from './FounderEventsLoadingStrategy';
import WriterEventsLoadingStrategy from './WriterEventsLoadingStrategy';
import IEventsLoadingStrategy from './interfaces/IEventsLoadingStrategy';
import { FeedType } from 'common/enums';

export default function getEventsLoaderForGivenFeedType(feedType: string): IEventsLoadingStrategy {
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