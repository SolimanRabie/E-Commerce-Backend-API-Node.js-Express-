/* eslint-disable node/no-missing-require */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
const ApiError = require('../utils/apiError');

// ******** multerOptions start "for shared code"*****//
const multerOptions = () => {
  // 1) DiskStorage
  // const multerStorage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, 'uploads/categories');
  //   },
  //   filename: function (req, file, cb) {
  //     // category-${id}-Date.now().jpeg
  //     const exe = file.mimetype.split('/')[1];
  //     const fileName = `category-${uuidv4()}-${Date.now()}.${exe}`;
  //     cb(null, fileName);
  //   },
  // });

  // 2) Memory Storage
  const storage = multer.memoryStorage();

  const multerFilter = function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new ApiError('only image Allowed ', 400), false);
    }
  };
  const upload = multer({ storage: storage, fileFilter: multerFilter });
  return upload;
};
// ******** multerOptions End *****//

//********Upload Single Image Start******/
exports.uploadSingleImage = (filedName) => multerOptions().single(filedName);
//********Upload Single Image End******/

//********Upload mix of Images Start******/
exports.uploadMixOfImages = (arrayOfFields) =>
  multerOptions().fields(arrayOfFields);
//********Upload mix of Images End******/
