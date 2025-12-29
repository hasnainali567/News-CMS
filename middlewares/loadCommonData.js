import Category from "../models/category.model.js";
import News from "../models/news.model.js";

const loadCommenData = async (req, res, next) => {
    try {
        const categoryInUse = await News.distinct('category');
        const categories = await Category.find({ '_id': { $in: categoryInUse } })
        const latestNews = await News.find().populate('category', { name: 1, slug: 1 }).populate('author', 'fullName').sort({ createdAt: -1 }).limit(5);

        res.locals.categories = categories;
        res.locals.latestNews = latestNews

        next()
    } catch (error) {
        next(error)
    }

}

export default loadCommenData