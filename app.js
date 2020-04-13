const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require ('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require ('./graphql/resolvers/index');

const app = express();
// we use graphql ( parser) syntax
app.use(bodyParser.json());

app.use('/graphql',
graphqlHttp({
    schema: graphQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true
})
);
//connect MONGO-DB through mongoose - feature to change password internally
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
  }@cluster0-uc0oy.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
)
.then(() => {//after coonections with mongodb start application
  app.listen(4000);
})
.catch(err => {// if any error -> log error
console.log(err);
});
