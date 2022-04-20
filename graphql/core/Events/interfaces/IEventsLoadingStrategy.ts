import { FeedItem } from "common/types";

export default interface IEventsLoadingStrategy {
    execute(): Array<FeedItem>;
}