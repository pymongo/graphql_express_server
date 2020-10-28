import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    rollDices(numDice: Int!): [Int!]
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
    rollDices: (args) => {
        console.info("[Query] rollDices", args);
        return [...Array(args.numDice).keys()].map(_ => 1 + Math.floor(Math.random() * 6));
    },
};

const app = express();
app.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);