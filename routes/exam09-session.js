const express = require("express");

const router = express.Router();

router.get("", (req, res, next) => {
    // console.log(req.session);
    // const uid = req.session.uid;
    // res.render("exam09_session", {uid});
    res.render("exam09_session");
});

router.post("/login", (req, res, next) => {
    const user = req.body;
    //
    req.session.uid = user.uid;
    res.redirect("/exam09");
});

router.get("/logout", (req, res, next) => {
    delete req.session.uid;
    // req.session.destroy()
    res.redirect("/exam09");
});

module.exports = router;