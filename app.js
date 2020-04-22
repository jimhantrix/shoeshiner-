const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');
const app = express();
// we use graphql ( parser) syntax
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use('/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);
//connect MONGO-DB through mongoose - feature to change password internally
//after coonections with mongodb start application
mongoose
  .connect(`mongodb+srv://${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD$}@cluster0-uc0oy.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
)
.then(() => {
    app.listen(8000);
})
.catch(err => {
    console.log(err);
});
