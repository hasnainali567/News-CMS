import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import expressLayout from 'express-ejs-layouts';
import connectDB from './config/db.js';
import 'dotenv/config.js';
import frontendRoutes from './routes/frontendRoutes/router.js';
import adminRoutes from './routes/adminRoutes/router.js';
import { globalErrorHandler } from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';

const filePath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filePath);


const app = express();


// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayout);
app.set('layout', 'layout');
app.set('view engine', 'ejs');


app.use('/admin', (req, res, next) => {
    res.locals.layout = 'admin/layout';
    next();
}
);

app.use('/admin', adminRoutes);

app.use('/', frontendRoutes);

app.use(globalErrorHandler);

//Connect to MongoDB and start the server
connectDB().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
