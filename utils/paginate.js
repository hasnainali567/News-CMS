
const paginate = async (model, query = {}, reqQuery = {}, options = {}) => {
    const { page = 1, limit = 2, sort = '-createdAt' } = reqQuery;

    const paginateOPtions = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort,
        ...options
    }

    try {

        const result = await model.paginate(query, paginateOPtions);
        return {
            data: result.docs,
            pagination: {
                totalDocs: result.totalDocs,
                totalPages: result.totalPages,
                page: result.page,
                limit: result.limit,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
            }
        }
    } catch (error) {
        console.error(error);


    }
}

export default paginate;