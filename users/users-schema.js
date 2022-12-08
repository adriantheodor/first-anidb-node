import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: String,
    accountType: {type: String, required: true, enum: ['ADMIN', 'OTAKU']},
}, {collection: 'users'})

export default usersSchema