const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URL);

// Define schemas
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const UserSchema = new schema({
    // Schema definition here
    email: String,
    name: String,
    password: String
});

const TodoSchema = new schema({
    // Schema definition here
    title: String,
    todoStatus: Boolean,
    userId: ObjectId
});

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    User,
    Todo
}