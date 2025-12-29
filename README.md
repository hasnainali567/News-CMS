# News CMS

A simple, easy-to-use content management system for managing news articles, categories, comments, and users. Built with Node.js and Express, featuring a clean MVC architecture and EJS templating.

## Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: MongoDB (via Mongoose)
- **Template Engine**: EJS
- **Frontend**: Bootstrap 5, Font Awesome, Summernote (rich text editor)
- **Deployment**: Vercel-ready configuration

## Key Features

- **Article Management**: Create, read, update, and delete news articles
- **Category System**: Organize articles into categories
- **Comment Management**: Moderate and manage user comments
- **Pagination**: Built-in pagination for browsing articles
- **Search Functionality**: Search articles with query persistence
- **User Management**: Admin panel for user control
- **Authentication**: Login system for admin and users
- **Responsive Design**: Bootstrap-based responsive UI
- **File Uploads**: Support for image uploads with Multer
- **Admin Dashboard**: Centralized control panel for all operations

## Folder Structure

```
News CMS/
├── config/              # Database and configuration files
├── controllers/         # Business logic for routes
│   ├── admin-controllers/      # Admin-specific logic
│   └── frontend-controllers/   # Public-facing logic
├── middlewares/         # Express middleware (auth, validation, file upload)
├── models/              # Database schemas (MongoDB models)
├── public/              # Static assets (CSS, JS, images, fonts)
│   ├── css/
│   ├── fonts/
│   ├── images/
│   ├── js/
│   └── uploads/         # Uploaded files storage
├── routes/              # Route definitions
│   ├── adminRoutes/     # Admin panel routes
│   └── frontendRoutes/  # Public website routes
├── utils/               # Helper functions and utilities
├── views/               # EJS template files
│   ├── admin/           # Admin panel templates
│   └── partials/        # Reusable template components
├── index.js             # Main application entry point
├── package.json         # Project dependencies
└── vercel.json          # Vercel deployment config
```

## Setup & Installation

### Prerequisites

Make sure you have the following installed:
- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB (local or MongoDB Atlas connection string)

### Steps

1. **Clone or download the project**
   ```bash
   cd "News CMS"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. **You're ready to go!**

## How to Run Locally

Start the development server:

```bash
npm start
```

The application will run on `http://localhost:5000` (or your configured PORT).

### Available Scripts

- `npm start` - Start the server
- `npm run dev` - Run with nodemon for auto-restart (if configured)

## Environment Variables

Create a `.env` file in the root directory with these variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/news-cms` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key-here` |
| `NODE_ENV` | Environment mode | `development` or `production` |

## Screenshots

*Screenshots section - Add screenshots of your News CMS here:*

- Admin Dashboard
- Article Management
- Frontend Homepage
- Article View

*(To add screenshots: Use `![Alt text](./public/images/screenshot.png)` format)*

## Project Structure Explanation

### Controllers
- Handle business logic and interact with models
- `admin-controllers/` - Admin panel operations
- `frontend-controllers/` - Public website operations

### Models
- Define database schema for articles, categories, users, and comments
- Use Mongoose for MongoDB interaction

### Routes
- Map URLs to controller functions
- Separate admin and frontend routes for organization

### Middlewares
- **auth.middleware.js** - Handle user authentication
- **admin.middleware.js** - Check admin permissions
- **validation.js** - Validate request data
- **multer.middleware.js** - Handle file uploads
- **error.middleware.js** - Handle errors globally

### Views (EJS Templates)
- **Admin templates** - Dashboard, user/article/category management
- **Frontend templates** - Homepage, article view, category pages
- **Partials** - Reusable components (header, footer, sidebar)

## Usage Examples

### Adding a New Article
1. Log in to admin panel
2. Go to "Articles" section
3. Click "Create New"
4. Fill in title, content, category
5. Upload featured image
6. Click "Publish"

### Managing Categories
1. Navigate to "Categories" in admin panel
2. Add, edit, or delete categories
3. Articles can be filtered by categories

### User Management
1. Admin panel has user management section
2. Create new users, edit roles, delete inactive accounts

## Future Improvements

- [ ] **Social Media Sharing** - Share articles on social platforms
- [ ] **Comments Moderation System** - Better comment approval workflow
- [ ] **Author Profiles** - Dedicated author pages with bio
- [ ] **Tags System** - Add flexible tagging alongside categories
- [ ] **SEO Optimization** - Meta tags and URL slugs
- [ ] **Analytics Dashboard** - Track article views and engagement
- [ ] **Email Notifications** - Notify admins of new comments
- [ ] **Dark Mode** - Add dark theme option
- [ ] **API Documentation** - Generate API docs with Swagger
- [ ] **Advanced Search Filters** - Filter by date, author, popularity

## Troubleshooting

**Problem**: MongoDB connection failed
- **Solution**: Check your `MONGODB_URI` in `.env` file and ensure MongoDB is running

**Problem**: Images not uploading
- **Solution**: Ensure `/public/uploads/` directory exists and has write permissions

**Problem**: Pages showing 404 errors
- **Solution**: Verify routes are correctly defined in `routes/` folder

## License

This project is open source and available for personal and commercial use.

## Support

For issues, questions, or suggestions, feel free to reach out or create an issue in the project repository.

---

**Happy coding! 🚀**
