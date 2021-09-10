var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var schema = require('./graphql');

var app = express();

const { MongoClient } = require('mongodb');
const url = 'mongodb://tasks-db:27017';
const client = new MongoClient(url);

async function start(app) {
  await client.connect();
  const db = client.db('test');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
    context: { db: db },
  }));
}

start(app);
module.exports = app;
