import mongoose from 'mongoose';
import slugify from 'slugify'

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true, },
}, { timestamps: true });

categorySchema.pre('save', function (next) {
    if (this.name) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});
const Category = mongoose.model('Category', categorySchema);

export default Category;
