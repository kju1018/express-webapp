const express = require("express");
const router = express.Router();
//------------------------------------------------------------------
let lastBno = 5;
let boards = [];
for(var i=1; i<=lastBno; i++) {
  boards.push({bno:i, btitle:"제목"+i, bcontent:"내용"+i, bwriter:"user1", bdate:new Date()})
}
//------------------------------------------------------------------
router.get("/boards", (req, res, next) => {
  boards.sort(function(a, b){return b.bno-a.bno});
  res.render("exam10_router/board_list", {boards});
});

//------------------------------------------------------------------
router.get("/boards/create", (req, res, next) => {
  res.render("exam10_router/board_create");
});

//위에 것(router.get("/boards", (req, res, next))보다 아래에 있어야 함---------------------------------------
router.get("/boards/:bno", (req, res, next) => {
  const bno = parseInt(req.params.bno);
  let board = null;
  for(let temp of boards) {
    if(temp.bno === bno) {
      board = temp;
      break;
    }
  }
  res.render("exam10_router/board_read", {board});
});

//------------------------------------------------------------------
router.post("/boards", (req, res, next) => {
  const board = req.body;
  board.bno = ++lastBno;
  board.bwriter = "user1";
  board.bdate = new Date();
  boards.push(board);
  res.redirect("/exam10/boards");
});
//------------------------------------------------------------------
router.get("/boards/:bno/update", (req, res, next) => {
  const bno = parseInt(req.params.bno);
  let board = null;
  for(let temp of boards) {
    if(temp.bno === bno) {
      board = temp;
      break;
    }
  }
  res.render("exam10_router/board_update", {board});
});

router.put("/boards", (req, res, next) => {
  const board = req.body;
  for(let temp of boards) {
    if(temp.bno === parseInt(board.bno)) {
      temp.btitle = board.btitle;
      temp.bcontent = board.bcontent;
      break;
    }
  }
  res.json({result:"success"});
});
//------------------------------------------------------------------
router.delete("/boards/:bno", (req, res, next) => {
  const bno = req.params.bno;
  boards = boards.filter(board => {
    return board.bno !== parseInt(bno)
  });
  //boards의 수만큼 함수 실행, 주어진 board가 bno와 다르냐 만약 true면
  //포함
  res.json({result:"success"});
});
//------------------------------------------------------------------

module.exports = router;