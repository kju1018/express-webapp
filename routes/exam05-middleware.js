const express = require("express");

const router = express.Router();

router.get("", (req, res, next) => {
    const board = {bno:1, btitle:"제목1", bcontent:"내용1",bwriter:"user1", bdate:"2021.05.11"};
    res.render("exam05_middleware", {board});
});



module.exports = router;