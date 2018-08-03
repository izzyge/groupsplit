const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  topic: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  tasks: [{type: String, required: true}]
  // [{ type: Schema.Types.ObjectId, ref: 'Task'}]
});

module.exports = mongoose.model('project', ProjectSchema);
