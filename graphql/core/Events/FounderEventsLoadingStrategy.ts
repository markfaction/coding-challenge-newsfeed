import IEventsLoadingStrategy from "./interfaces/IEventsLoadingStrategy";
import { FeedItem } from "common/types";

export default class FounderEventsLoadingStrategy implements IEventsLoadingStrategy {
    public execute(): Promise<Array<FeedItem>> {
        return Promise.resolve([]);
    }
}