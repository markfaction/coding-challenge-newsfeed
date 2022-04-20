import IEventsLoadingStrategy from "./interfaces/IEventsLoadingStrategy";
import { FeedItem } from "common/types";

export default class WriterEventsLoadingStrategy implements IEventsLoadingStrategy {
    public execute(): Array<FeedItem> {
        return [];
    }
}