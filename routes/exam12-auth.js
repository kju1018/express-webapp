const express = require("express");
const userService = require("../services/user-service");
const sessionAuth = require("../security/sessionAuth");
const jwtAuth = require("../security/jwtAuth");

const router = express.Router();

router.get("", (req, res, next)=>{
    res.render("exam12_auth/index");
});

router.get("/loginForm", (req, res, next)=>{
    //로그인 실패시 리다이렉트해서 요청된 경우 에러정보 얻기
    let loginError = req.session.loginError;
    //로그인 실패시 저장했던 에러 정보 삭제
    //사용자가 직접 /loginForm을 요청했을때 에러 정보가 나오면 안되기 때문
    if(loginError){
        delete req.session.loginError;
    } else {
        //사용자가 직접 /loginForm을 요청했을때
        loginError = {};
    }
    res.render("exam12_auth/loginForm", {loginError});
});

router.get("/joinForm", (req, res, next)=>{
    res.render("exam12_auth/joinForm");
});

router.post("/join", async (req, res, next) => {
    try {
        const user = req.body;
        await userService.create(user);
        res.redirect("/exam12");
    } catch (error) {
        next(error);
    }
});


router.post("/login", async (req, res, next) =>{
    try {
        const user = req.body;
        const result = await userService.login(user);
        if(result.id !== "success"){//로그인 실패
            req.session.loginError = result;
            res.redirect("/exam12/loginForm");
        } else {
            //세션 인증일 경우
            sessionAuth.setAuth(req, res, user.userid);

            //JWT 인증일 경우
            //쿠키방식
            const authToken = jwtAuth.createJwt(user.userid);
            res.cookie("authToken", authToken, {
                domain:"localhost",
                path:"/",
                expires: new Date(Date.now() + 1000*60*60*12),
                signed: true,
                httpOnly: true,
                secure: false
            })
            res.redirect("/exam12");
        }        
    } catch (err) {
        next(err);
    }
    
});

router.post("/login2", async (req, res, next) =>{
    try {
        const user = req.body;
        const result = await userService.login(user);
        if(result.id !== "success"){//로그인 실패
            req.session.loginError = result;
            res.redirect("/exam12/loginForm");
        } else {
            //JWT 인증일 경우
            const authToken = jwtAuth.createJwt(user.userid);

            res.json({userid: user.userid, authToken});
        }        
    } catch (err) {
        next(err);
    }
    
});

router.get("/logout", (req, res, next) => {
    //세션 인증일 경우
    sessionAuth.removeAuth(req);

    //JWT 인증일 경우
    res.clearCookie("authToken");

    //리다이렉트
    res.redirect("/exam12");

    console.log(req.session.userid);
});

module.exports=router;



 