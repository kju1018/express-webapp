//모듈 가져오기
const express = require("express");

//라우터 객체 생성
const router = express.Router();

//요청 매핑하기
router.get("/", (req, res) => {
    res.render("exam01_home");
});

module.exports = router;



//router.get주소와 app.js의 app.use("/")주소가 서로 다르면 안불러와짐
//둘 중 하나만 있어야함?(일단 둘 다 주소가 있으면 에러남)