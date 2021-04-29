const express = require("express");

const router = express.Router();

router.get("", (req, res) => {
    const board = {bno:1, btitle:"제목1", bcontent:"내용1",bwriter:"usser1", bdate:"2021.05.11"};
    res.render("exam03_include/index", {board});
    //include되고 board가 바인딩이 되기때문에 content에서도 바인딩 가능
});


module.exports = router;



