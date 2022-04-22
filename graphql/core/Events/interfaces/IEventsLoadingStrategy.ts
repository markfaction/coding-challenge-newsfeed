import { FeedItem } from "common/types";

export default interface IEventsLoadingStrategy {
    execute(): Promise<Array<FeedItem>>;
}