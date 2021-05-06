//모듈 가져오기 
const express = require("express");
const path = require("path");
const nunjucks =  require("nunjucks");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { sequelize } = require("./sequelize/models/index")//./sequelize/models/여기까지 해도 상관없음 하지만 지금은 명시적으로 작성
//require("./sequelize/models/index")이거는 db를 가져오지만 구조분해할당으로 sequelize를 가져옴

//라우터 가져오기
const exam01Home = require("./routes/exam01-home");
const exam02BindIfFor = require("./routes/exam02-bind-if-for"); 
const exam03Include = require("./routes/exam03-include");
const exam04ExtendsBlock = require("./routes/exam04-extend-block");
const exam05MiddleWare = require("./routes/exam05-middleware");
const exam06DataReceive = require("./routes/exam06-data-receive");
const exam07MultipartFormData = require("./routes/exam07-multipart-form-data");
const exam08Cookie = require("./routes/exam08-cookie");
const exam09Session = require("./routes/exam09-session");
const exam10Router = require("./routes/exam10-router");
const exam11Sequelize = require("./routes/exam11-sequelize");

// .env파일을 읽어서 process.env에 추가
dotenv.config();

//애플리케이션 객체 생성
const app = express();
app.set("port", process.env.PORT);

//템플릿 엔진으로 nunjucks 설정
//view 파일의 확장명을 .html로 한다.
app.set("view engine", "html");

//뷰 파일의 폴더 설정
nunjucks.configure("views", {
    express: app,
    watch: true
});

//sequelize 데이터 연결과 동시에 모델과 테이블을 매칭(동기화)
sequelize.sync()
    .then(() => {
        console.log("DB 연결 성공");
    })
    .catch((err) => {
        console.log("DB 연결 실패", err.message);
    });


//정적 파일들을 제공하는 폴더 지정
app.use(express.static(path.join(__dirname, "public")));//use는 모든 요청 방식을 다 허용, 모든요청에 해당하는 미들웨어

//모든 요청 경로에 실행되는 미들웨어
// app.use((req, res, next) => {
//     console.log("미들웨어1 전처리");
//     // res.send("<html><body>Test</body></html>");
//     //next가 빠지면 응답을 보내주는 코드 필요 왜냐하면 다음으로 넘어가는 코드가 없기 때문에
//     next();
//     console.log("미들웨어1 후처리");
// });

// app.use((req, res, next) => {
//     console.log("미들웨어2 전처리");
//     // res.send("<html><body>Test</body></html>");
//     //next가 빠지면 응답을 보내주는 코드 필요 왜냐하면 다음으로 넘어가는 코드가 없기 때문에
//     next();
//     console.log("미들웨어2 후처리");
// }, (req, res, next) => {
//     console.log("미들웨어3 전처리");
//     // res.send("<html><body>Test</body></html>");
//     //next가 빠지면 응답을 보내주는 코드 필요 왜냐하면 다음으로 넘어가는 코드가 없기 때문에
//     next();
//     console.log("미들웨어3 후처리");
// });

// //로그 출력을 위한 미들웨어
// app.use(morgan("dev"));
// app.use(morgan("combined"));
// app.use(morgan(":method :url :remote-addr :status :res[content-length] "));


// 브라우저 캐싱 금지 미들웨어 적용
app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
})

//요청 HTTP 본문에 있는 (POST 방식) 데이터를 파싱해서
//req.body 객체로 만드는 미들웨어 적용
app.use(express.urlencoded({extended:true})); //x-www-form-urlencoded: param1=value1&param2=value2 
app.use(express.json());//raw/json: {"param1":"value1", "param2":"value2"}



//요청 HTTP 헤더에 있는 쿠키를 파싱해서(해석해서) 
//req.cookies(서명이 안된것) 또는 req.signedCookies(서명이 된) 객체로 생성하는 미들웨어 적용
app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(cookieParser());

//세션 설정
app.use(session({
    resave: false, //다시 저장 false 
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true, //자바 스크립트에서 사용하지 말아라
        secure: false,
        maxAge: 1000*60*30 //30분동안 유효
    }
}));//session이 리턴하는게 미들웨어

//(모든 템블릿(뷰, html)에서 바인딩 할 수 있는 데이터)를 설정하는 미들웨어 적용
app.use((req, res, next) => {
    res.locals.uid = req.session.uid || null; //session에 uid가있으면 넣어주고 없으면 null
    next();
})

//요청 경로와 라우터 매핑
//"/"이렇게 요청했을때 exam01Home라는 미들웨어를 실행하겠다. 라우터도 미들웨어
app.use("/", exam01Home);

//미들웨어 형식
// app.use("/", (req, res, next) => {
//     res.send("<html><body>Test</body></html>");
// })
app.use("/exam02", exam02BindIfFor);
app.use("/exam03", exam03Include);
app.use("/exam04", exam04ExtendsBlock);
app.use("/exam05", exam05MiddleWare);
app.use("/exam06", exam06DataReceive);
app.use("/exam07", exam07MultipartFormData);
app.use("/exam08", exam08Cookie);
app.use("/exam09", exam09Session);
app.use("/exam10", exam10Router);
app.use("/exam11", exam11Sequelize);

//404처리 미들웨어
//위에 맞는 경로가 없을때
app.use((req, res, next) => {
    
    const error = new Error("잘못된 요청");// 에러 객체
    error.status = 404;
    next(error);
})

//에러 처리 미들웨어
app.use((err, req, res, next) => {
    const error = (process.env.NODE_ENV !== "production")? err:{};
    // err= (app.get("env") !== "productrion")? err:{};//req.app.get("env") == app.get("env") req 생략가능
    error.message = req.method + " " + req.url + ": " + err.message;
    error.status = err.status || 500;
    res.status(error.status);
    res.render("common/error.html", {error});
});

//애플리케이션 실행
app.listen(app.get("port"), () => {
    console.log(`Listening to port ${app.get("port")}`);
});