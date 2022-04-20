import { useRouter } from "next/router";
import {User, Project, Announcement} from '../../common/types';
import Layout from '../../components/Layout';
import UserCard from '../../components/UserCard';
import ProjectCard from '../../components/ProjectCard';
import AnnouncementCard from '../../components/AnnouncementCard';


type FeedItem = {
    id: number,
    created: Date,
    type: "user" | "project" | "announcement",
    value: User | Project | Announcement,
}

// Dummy data setup to test newsfeed UI (to be wired up to backend later)
const feedItems: Array<FeedItem> = [];

feedItems.push({
    id: 2222,
    created: new Date('12.4.2022'),
    type: 'user',
    value: {
        id: 1,
        name: "Test User",
        bio: "Test Bio",
        fellowship: "angels",
        avatar_url: "",
        projects: [],
    }
});

feedItems.push({
    id: 2244,
    created: new Date('18.4.2022'),
    type: 'project',
    value: {
        id: 3,
        name: "Test Project",
        description: "Test Description",
        icon_url: "",
        users: [],
    }
});

feedItems.push({
    id: 789,
    created: new Date('20.4.2022'),
    type: 'announcement',
    value: {
        id: 5,
        fellowship: 'all',
        title: 'Test Announcement',
        body: 'This is a public announcement',
    }
})

// Return the correct card to be rendered, based on the feed item type
const displayFeedItems = () => {
    if(feedItems && feedItems.length > 0) {
        return feedItems.map(item => {
            switch(item.type) {
                case 'user': {
                    return <UserCard user={item.value as User} />
                    break;
                }
                case 'project': {
                    return <ProjectCard project={item.value as Project} />
                    break;
                }
                case 'announcement': {
                    return <AnnouncementCard announcement={item.value as Announcement} />
                    break;
                }
                default: {
                    return <h3>Invalid feed item type</h3>;
                }
            }
        });
    }
}


export default function NewsFeed() {
    const feedType = useRouter().query.type;
    return <>
        <h1>News Feed type received: {feedType}</h1>
        <Layout>
            {displayFeedItems()}
        </Layout>
    </>
}


