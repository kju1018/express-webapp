//모듈 가져오기
const express = require("express");
const boardService = require("../services/board-service");
const paging = require("../utils/paging");
const jwtAuth = require("../security/jwtAuth");

//라우터 객체 생성
const router = express.Router();

//요청 매핑하기
router.get("", (req, res) => {
    res.render("exam13_cors");
})

router.get("/boardlist", jwtAuth.checkAuth, async (req, res) => {
    try {
        //req.query.pageNo 이건 문자열
        const pageNo = 1;
        const totalRows = await boardService.totalRows();
        const pager = paging.init(5, 5, pageNo, totalRows);
        const boards = await boardService.list(pager);
        res.json({boards, pager});
    } catch (error) {
        next(error);
    }
});

module.exports = router;



//router.get주소와 app.js의 app.use("/")주소가 서로 다르면 안불러와짐
//둘 중 하나만 있어야함?(일단 둘 다 주소가 있으면 에러남)