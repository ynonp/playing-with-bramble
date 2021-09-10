const tasks = db.tasks;
const tags = db.tags;

const { insertedIds } = tags.insertMany([
  { key: 1, text: 'home', weight: 1 },
  { key: 2, text: 'work', weight: 2 },
]);

const [home, work] = insertedIds;

tasks.insertMany([
  { key: 1, text: 'write code', done: false, tags: [work]  },
  { key: 2, text: 'test it', done: false, tags: [work] },
  { key: 3, text: 'take a nap', done: false, tags: [home] },
  { key: 4, text: 'make dinner for everyone', done: false, tags: [home, work] },
]);
