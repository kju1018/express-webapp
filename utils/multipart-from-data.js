const multer = require("multer");

//disk는 하드디스크, 하드디스크에 저장한다
const multipartFormData = multer({
    storage: multer.diskStorage({
        destination: function(req, file, done) {//done도 콜백함수
            done(null, process.env.UPLOAD_PATH);
        },
        filename: function(req, file, done) {
            done(null, Date.now() + "-" + file.originalname);
        }
    }),
    limits: {fileSize: 10*1024*1024}
});



module.exports = multipartFormData;