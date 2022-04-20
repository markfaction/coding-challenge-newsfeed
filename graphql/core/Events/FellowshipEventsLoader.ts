import IEventsLoadingStrategy from "./interfaces/IEventsLoadingStrategy";
import { FeedItem } from "common/types";

export default class FellowShipEventsLoader {

    private eventsLoadingStrategy: IEventsLoadingStrategy;

    constructor(strategy: IEventsLoadingStrategy) {
        this.eventsLoadingStrategy = strategy;
    }

    private sortEventsByCreatedDateDesc(events: Array<FeedItem>): Array<FeedItem> {
        return [];
    }

    public getEventsSortedByNewestFirst(): Array<FeedItem> {
        try {

            // Run concrete strategy to get required data
            const items: Array<FeedItem> = this.eventsLoadingStrategy.execute();
            if(!items) throw 'No events found for given feed type';

            return this.sortEventsByCreatedDateDesc(items);
        } catch (error) {
            // log error
            console.log('Error: ', error);
        }
        return [];
    }

    
}