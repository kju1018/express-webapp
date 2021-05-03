const express = require("express");
const multipartFormData = require("../utils/multipart-from-data");

const router = express.Router();

router.get("",(req, res, next) => {
    res.render("exam07_multipart_form_data");

});

router.post("/upload1", multipartFormData.single("battach"), (req, res, next) => {
    console.log(req.body);//문자파트
    console.log(req.file);//파일파트
    res.redirect("/exam07");
});

router.post("/upload2", multipartFormData.array("battach"), (req, res, next) => {
    console.log(req.body);//문자파트
    console.log(req.files);
    res.redirect("/exam07");
});

router.post("/upload3", multipartFormData.fields([{name:"battach1"}, {name:"battach2"}]), (req, res, next) => {
    console.log(req.body);//문자파트
    console.log(req.files);
    res.redirect("/exam07");
});

router.post("/upload4", multipartFormData.array("battach"), (req, res, next) => {
    console.log(req.body);//문자파트
    console.log(req.files);
    const result = {charPart: req.body, filePart: req.files};
    res.json(result);//json응답, 이건 넌적스가 관여안함 render만 넌적스가 관여함
});

router.post("/upload5", multipartFormData.fields([{name:"battach1"}, {name:"battach2"}]), (req, res, next) => {
    console.log(req.body);//문자파트
    console.log(req.files);
    const result = {charPart: req.body, filePart: req.files};
    res.json(result);//json응답, 이건 넌적스가 관여안함 render만 넌적스가 관여함
});

router.get("/download", (req, res, next) => {
    const fileOriginalName = req.query.fileOriginalName;
    const fileSavePath = process.env.UPLOAD_PATH + req.query.fileSaveName;
    res.download(fileSavePath, fileOriginalName);
})

module.exports = router;