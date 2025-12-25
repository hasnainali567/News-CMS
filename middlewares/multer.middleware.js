import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const limit = {
    fileSize: 2 * 1024 * 1024 // 2 MB
}

const fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
        cb(null, true);
    } else {
        cb(new Error('Only .jpeg, .png, .gif format allowed!'), false);
    }
}

const upload = multer({ storage: storage, limits: limit, fileFilter: fileFilter });
export default upload;