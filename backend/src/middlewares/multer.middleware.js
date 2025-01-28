import multer, { diskStorage } from "multer";

const storage = diskStorage({
    destination: (_, _, cb) => {
        cb(null, './public/temp/');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

export default upload; 