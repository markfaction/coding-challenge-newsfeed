import IEventsLoadingStrategy from "./interfaces/IEventsLoadingStrategy";
import { FeedItem } from "common/types";

export default class FellowShipEventsLoader {

    private eventsLoadingStrategy: IEventsLoadingStrategy;

    constructor(strategy: IEventsLoadingStrategy) {
        this.eventsLoadingStrategy = strategy;
    }

    public async getEventsSortedByNewestFirst(): Promise<Array<FeedItem>> {
        try {
            // Run concrete strategy to get required feed items
            const items: Array<FeedItem> = await this.eventsLoadingStrategy.execute();
            if(!items || items.length === 0) throw 'No events found for given feed type';

            // sort feed items to have latest events first
            const sortedFeedItems = items.sort(
                (feedItemOne, feedItemTwo) => feedItemTwo.created.getTime() - feedItemOne.created.getTime(),
              );
            
            return sortedFeedItems;
        } catch (error: any) {
            console.log(`Error: ${error.message}`);
            console.log(`Error Stacktrace: ${error.stack}`);
        }
        return [];
    }

    
}