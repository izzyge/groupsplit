const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: String,
  body: String,
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
});

module.exports = mongoose.model('Task', TaskSchema);
