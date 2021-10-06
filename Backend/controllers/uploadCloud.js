const util = require('util'); // ไว้สำหรับแปลง cbfn => promise
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

exports.uploadPromise = util.promisify(cloudinary.uploader.upload);

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + '.' + file.mimetype.split('/')[1]);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new CustomError('Only .png, .jpg and .jpeg format allowed!'),
        400
      );
    }
  },
});
console.log('.....................................................');
exports.uploadSingle = upload.single('cloudinput');
