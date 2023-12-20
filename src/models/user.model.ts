import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
    lastName: string;
    firstName: string;
    email: string;
    password: string;
}

const userSchema: Schema = new Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Email is unique
    password: { type: String, required: true }
});

export default mongoose.model<User>('User', userSchema);