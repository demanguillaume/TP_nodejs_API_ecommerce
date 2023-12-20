import mangoose, { Schema, Document } from 'mongoose';

interface Post extends Document {
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true}
    title: string;
    content: string;
    imageUrl: string;
}

const postSchema: Schema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true }
});

export default mangoose.model<Post>('Post', postSchema);