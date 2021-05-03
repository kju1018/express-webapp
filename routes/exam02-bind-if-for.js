const express = require("express");

const router = express.Router();

router.get("", (req, res) => {//""여기는 app.js에서 어떻게 매핑 했냐에 따라
    const userId = null;
    const board = {bno:1, btitle:"제목1", bcontent:"내용1",bwriter:"user1", bdate:"2021.05.11"};

    const boards = [];
    for(var i =1 ; i <= 10; i++){
        boards.push({bno:i, btitle:"제목"+i, bcontent:"내용" + i,bwriter:"usser1", bdate:new Date()});
    }
    res.render("exam02_bind_if_for", {userId, board, boards});
    //뷰 이름을 지정함
})

module.exports = router;