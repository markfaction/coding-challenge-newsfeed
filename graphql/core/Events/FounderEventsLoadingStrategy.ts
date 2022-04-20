import IEventsLoadingStrategy from "./interfaces/IEventsLoadingStrategy";
import { FeedItem } from "common/types";

export default class FounderEventsLoadingStrategy implements IEventsLoadingStrategy {
    public execute(): Array<FeedItem> {
        return [];
    }
}