const express = require("express");

const router = express.Router();

router.get("", (req, res, next) => {
    res.render("exam08_cookie/index");
});

router.get("/createCookie", (req, res, next) => {
    const user = {uid:"user1", uname:"홍길동"};//객체로 해도 되고 따로따로 해도 상관없음 이건 객체
    const strUser = JSON.stringify(user);// 이 친구가 쿠키의 값
    res.cookie("user", strUser, {
        domain: "localhost",//쿠키를 너가 언제 들고 와야하냐, 어느 서버로 접속할때 쿠키를 가져와야 하느냐, 언제 
        path: "/", //localhost/a/... localhost/b/... 여기서 a에만 가고싶을때 지정, 지정할 경로를 설정
        expires: new Date(new Date().getTime() + 1000*60*30),//지금 시간으로부터 30분
        signed: true,
        //쿠키의 값이 변질되지않도록 서명을 할지 말지 내가 보낸 쿠키의 값이 클라이언트에의해 변질될수도 있음 즉 값이 바뀔수있음
        //만약 클라이언트가 쿠키 값을 바꿔버리면 다른 데이터를 쓰게됨 (기분나쁨) 아예 못바꾸도록 서명을 해버림
        //나만 알 수 있는 서명 그걸로 확인을 함 true이면 넌 값을 바꿔도 의미가없다 라는 뜻
        httpOnly: true,
        //자바스크립트에서 아예 내가 보낸 쿠키에 접근을 못하도록 차단, 무조건 네트워크 통신에서만 사용, 자바스크립트에서 가공 불가
        secure: false
        //프로토콜은 2개 http, https(시큐어 소켓 레이어가 적용) 나중에 ssl 적용
        //이 친구를 true로 하면 무조건 https로만 쿠키를 전송가능 그래서 false

    });
    res.redirect("/exam08");
});

router.get("/readCookie", (req, res, next) => {
    console.log(req.cookies);
    console.log(req.signedCookies);
    const user = JSON.parse(req.signedCookies.user);//얘는 문자열! 다시 자바 스크립트 객체로 만들어야함
    res.render("exam08_cookie/readCookie", {user});
})

module.exports = router;