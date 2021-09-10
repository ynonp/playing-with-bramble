const fortune = require('random-fortune')
const { printSchema } = require('graphql');

module.exports = {
  Query: {
    fortune() {
      return fortune.fortune();
    },

    service(_obj, _args, _context, info) {
      console.log(info);
      const result = {
        name: 'Fortune',
        version: '1.0',
        schema: require('./schema.graphql'),
      };
      console.log(result);

      return result;
    },
  },
};
