import { useRouter } from "next/router";

export default function NewsFeed() {
    const feedType = useRouter().query.type;
    return <h1>News Feed type received: {feedType}</h1>
}