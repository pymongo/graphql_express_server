import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema, graphql } from 'graphql';

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type Query {
        rollDices(numDice: Int!): [Int!]!
    }
`);

// The root provides a resolver function for each API endpoint
const root = {
    // ES6 destructuring assignment, (args) -> ({numDice}), ignore all fields form args except numDice
    rollDices({numDice}) {
        console.info("[Query] rollDices");
        return [...Array(numDice).keys()].map(_ => 1 + Math.floor(Math.random() * 6));
    },
};

const app = express();
app.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);