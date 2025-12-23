import express from 'express';
import path from 'path';
import expressLayout from 'express-ejs-layouts';
import connectDB from './config/db.js';
import 'dotenv/config.js';
import frontendRoutes from './routes/frontendRoutes/router.js';
import adminRoutes from './routes/adminRoutes/router.js';
import { globalErrorHandler } from './middlewares/error.middleware.js';

const filePath = path.dirname(new URL(import.meta.url).pathname);
const __dirname = filePath.startsWith('/') ? filePath.slice(1) : filePath;


const app = express();


// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayout);
app.set('layout', 'layout');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/api', frontendRoutes);
app.use('/admin', adminRoutes);
app.use(globalErrorHandler);

//Connect to MongoDB and start the server
connectDB().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
