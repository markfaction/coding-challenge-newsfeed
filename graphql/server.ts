import {ApolloServer, gql} from 'apollo-server-micro'
import * as resolvers from './resolvers'

const typeDefs = gql`
  union FeedItemValue = Project | User | Announcement

  type Project {
    id: Int!
    name: String!
    description: String!
    icon_url: String!
    users: [User]
  }

  type User {
    id: Int!
    name: String!
    bio: String!
    avatar_url: String!
    fellowship: String!
    projects: [Project]
  }

  type Announcement {
    id: Int!
    fellowship: String!
    title: String!
    body: String!
  }

  type FeedItem {
    id: String!,
    created: String!,
    type: String!,
    value: FeedItemValue,
  }

  type FeedPage {
    id: Int!
    hasNext: Boolean,
    list: [FeedItem],
  }

  type Query {
    project(id: Int!): Project!
    user(id: Int!): User!
    feedItems(feedType: String!, offSet: Int, limit: Int): FeedPage!
  }
`;

export const server = new ApolloServer({typeDefs, resolvers})
