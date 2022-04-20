import IEventsLoadingStrategy from "./Events/interfaces/IEventsLoadingStrategy";
import { FeedType } from "common/enums";
import { FeedItem } from "common/types";

export default class FounderEventsLoadingStrategy implements IEventsLoadingStrategy {
    public execute(feedType: typeof FeedType): Array<FeedItem> {
        return [];
    }
}