import express from 'express';

const router = express.Router();

router.get('/category/:name', getByCategory);


export default router;