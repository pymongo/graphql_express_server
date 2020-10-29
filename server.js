import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema, graphql } from 'graphql';

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type Query {
        rollDices(numDice: Int!): [Int!]!
        twitter: Twitter!
        youtube: Youtube!
    }
    type Twitter {
        queryOnlineUsers: Int!
    }
    type Youtube {
        queryOnlineUsers: Int!
    }
`);

class Twitter {
    queryOnlineUsers({ userId }) {
        return 1;
    }
}

class Youtube {
    constructor(country) {
        this.country = country;
    }
    queryOnlineUsers({ userId }) {
        return 2;
    }
}

// The root provides a resolver function for each API endpoint
const root = {
    // ES6 destructuring assignment, (args) -> ({numDice}), ignore all fields form args except numDice
    rollDices({ numDice }) {
        console.info("[Query] rollDices");
        return [...Array(numDice).keys()].map(_ => 1 + Math.floor(Math.random() * 6));
    },
    twitter() {
        return new Twitter;
    },
    youtube() {
        return new Youtube("UK");
    }
};

const app = express();
app.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);