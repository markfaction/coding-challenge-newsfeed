import IEventsLoadingStrategy from "./Events/interfaces/IEventsLoadingStrategy";
import { FeedItem } from "common/types";

export default class FellowShipEventsLoader {

    private eventsLoadingStrategy: IEventsLoadingStrategy;

    constructor(strategy: IEventsLoadingStrategy) {
        this.eventsLoadingStrategy = strategy;
    }

    public getEventsSortedByNewestFirst(): Array<FeedItem> {
        return [];
    }
}