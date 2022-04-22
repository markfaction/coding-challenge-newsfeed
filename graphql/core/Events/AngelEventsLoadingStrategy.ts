import IEventsLoadingStrategy from "./interfaces/IEventsLoadingStrategy";
import { FeedItem } from "common/types";

export default class AngelEventsLoadingStrategy implements IEventsLoadingStrategy {
    public execute(): Promise<Array<FeedItem>> {
        return Promise.resolve([]);
    }
}