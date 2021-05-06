//모듈 가져오기
const express = require("express");
const boardService = require("../services/board-service");
const paging = require("../utils/paging");

//라우터 객체 생성
const router = express.Router();

//요청 매핑하기
router.get("",  (req, res, next) => {
    res.render("exam11_sequelize");
});

router.get("/path1", async (req, res, next) => {
    try {
        //req.query.pageNo 이건 문자열
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const totalRows = await boardService.totalRows();
        const pager = paging.init(5, 5, pageNo, totalRows);
        const boards = await boardService.list(pager);
        res.json({boards, pager});
    } catch (error) {
        next(error);
    }
}); 

router.get("/path2", async (req, res, next) => {
    try {
        const keyword =  req.query.keyword;
        const column = req.query.column;
        const searchMethod = {keyword, column};
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const totalRows = await boardService.totalRows(searchMethod);
        const pager = paging.init(5, 5, pageNo, totalRows);
        const boards = await boardService.list(pager, searchMethod);
        res.json({boards, pager});
    } catch (error) {
        next(error);
    }
}); 

router.get("/path3", async (req, res, next) => {
    try {
        let {startBno, endBno} = req.query;
        startBno = parseInt(startBno);
        endBno = parseInt(endBno);
        const boards = await boardService.rangeList(startBno, endBno);
        res.json(boards);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get("/path4", async (req, res, next) => {
    try {
        const bno = parseInt(req.query.bno);
        const board = await boardService.getBoard(bno);
        res.json(board);
    } catch (error) {
        next(error);
    }
});

router.post("/path5", async(req, res, next) =>{
    try {
        // const board = req.body;
        // board.bwriter = "user1";
        const board = {...req.body, bwriter:"user1"};
        const dbBoard = await boardService.create(board);
        res.json(dbBoard);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.put("/path6", async (req, res, next) => {
    try {
        // const bno = parseInt(req.body.bno);
        // const btitle = req.body.btitle;
        // const bcontent = req.body.bcontent;
        // const board = {bno, btile, bcontent};
        const board = {...req.body, bno:parseInt(req.body.bno)};
        const rows = await boardService.update(board);
        res.json({result: rows + "행이 수정됨"});
    } catch (error) {
        next(error);
    }
});

router.delete("/path7", async (req, res, next) =>{
    try {
        const bno = parseInt(req.body.bno);
        const rows = await boardService.delete(bno);
        res.json({result: rows + "행이 삭제됨"});
    } catch (error) {
        next(error);
    }
});

router.get("/path8", async (req, res, next) => {
    try {
        const userid = req.query.userid;
        const user = await boardService.getUserAndBoard(userid);
        res.json(user);
    } catch (error) {
        next(error);
    }
})

module.exports = router;



//서비스를 사용하면 프로미스를 리턴하기때문에 동기하기위해 async사용


//서비스에서 async를 넣음 그럼 비동기로 동작 그래서 await를 써서 기다려야함







//---------------------------------------
/*//모듈 가져오기
const express = require("express");
const boardService = require("../services/board-service");

//라우터 객체 생성
const router = express.Router();

//요청 매핑하기
router.get("", async (req, res, next) => {
    try{
        // const result = await boardService.totalRows();
        // console.log(result);

        const result = await boardService.list();
        console.log(result);

        res.render("exam11_sequelize");
    }catch(error) {
        next(error)
    }
});
// router.get("", (req, res) => {
//     boardService.totalRows();
//     res.render("exam11_sequelize");
// });

module.exports = router;



//router.get주소와 app.js의 app.use("/")주소가 서로 다르면 안불러와짐
//둘 중 하나만 있어야함?(일단 둘 다 주소가 있으면 에러남)*/