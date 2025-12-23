import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2'
const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    image: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

newsSchema.plugin(paginate);
const News = mongoose.model('News', newsSchema);

export default News;