const tasks = require('../dal/tasks');
const { printSchema } = require('graphql');

module.exports = {
  Query: {
    service(_obj, _args, _context, info) {
      return {
        name: 'Tasks',
        version: '1.0',
        schema: require('./schema.graphql'),
      }
    },
    tasks(_obj, args, context, _info) {
      const { db } = context;
      return tasks.getTasks(db, args.done);
    },
    task(_obj, args, context) {
      const { db } = context;
      const { id } = args;
      return tasks.getTask(db, id);
    },
  },
  Mutation: {
    toggleTask(_obj, args, context) {
      const { db } = context;
      const { id } = args;

      return tasks.toggleTask(db, id);
    },

    addTask(_obj, args, context) {
      const { text, done } = args.info;
      const { db } = context;
      console.log(args);

      return tasks.createTask(db, text, done);
    },
  },

  Task: {
    async tags(obj, _args, context, _info) {
      const { db } = context;
      return tasks.getTags(db, obj);
    }
  },
};
