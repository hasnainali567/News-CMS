import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    news: { type: mongoose.Schema.Types.ObjectId, ref: 'News', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    status: { type: String, enum: ['approved', 'pending', 'rejected'], default: 'pending', required: true },
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;