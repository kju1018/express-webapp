const express = require("express");

const router = express.Router();

router.get("", (req, res, next) => {
    res.render("exam06_data_receive/index");
});

router.get("/getQueryString", (req, res, next) => {
    console.log(req.query);
    const bno = parseInt(req.query.bno);
    const pageNo = parseInt(req.query.pageNo);
    res.redirect("/exam06");
    res.end();
});

router.get("/getPathVariable/:bno/:pageNo", (req, res, next) => {
    console.log(req.params);
    const bno = parseInt(req.params.bno);
    const pageNo = parseInt(req.params.pageNo);
    res.redirect("/exam06");
    res.end();
});

router.post("/postReceive",(req, res, next) => {
    console.log(req.body);
    const board = req.body;
    // res.end();
    res.render("exam06_data_receive/postReceive", {board});
})

module.exports = router;