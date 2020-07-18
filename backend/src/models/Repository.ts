import mongoose from 'mongoose';

const RepositorySchema = new mongoose.Schema({
  id: Number,
  user: Number,
  name: String,
  description: String,
  url: String,
  tags: [String],
});

export default mongoose.model('Repository', RepositorySchema);
