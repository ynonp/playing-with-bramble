var mongo = require('mongodb');

// get all tasks. If done is not null then get only tasks whose "done"
// value match what was passed in
exports.getTasks = async function(db, done=null) {
  if (done != null) {
    return db.collection('tasks').find({ done }).toArray();
  } else {
    return db.collection('tasks').find({}).toArray();
  }
}

exports.getTask = async function(db, id) {
  const o_id = new mongo.ObjectId(id);
  return db.collection('tasks').findOne({ _id: o_id });
};

exports.toggleTask = async function(db, id) {
  const o_id = new mongo.ObjectId(id);
  await db.collection('tasks').update({
    _id: o_id
  },
    [
      {
        $set: {
          done: {
            $not: "$done"
          }
        }
      }
    ])
  return db.collection('tasks').findOne({ _id: o_id });
};

exports.createTask = async function(db, text, done) {
  const { insertedId } = await db.collection('tasks').insertOne({ text, done, tags: [] });
  return db.collection('tasks').findOne({ _id: insertedId });
};

exports.getTags = async function(db, task) {
  return db.collection('tags').find({ _id: { $in: task.tags }}).toArray();
}

