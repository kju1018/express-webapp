//모듈 가져오기 
const express = require("express");
const path = require("path");
const nunjucks =  require("nunjucks");
const dotenv = require("dotenv");
const morgan = require("morgan");

//라우터 가져오기
const exam01Home = require("./routes/exam01-home");
const exam02BindIfFor = require("./routes/exam02-bind-if-for"); 
const exam03Include = require("./routes/exam03-include");
const exam04ExtendsBlock = require("./routes/exam04-extend-block");
const exam05MiddleWare = require("./routes/exam05-middleware");
const exam06DataReceive = require("./routes/exam06-data-receive");
const exam07MultipartFormData = require("./routes/exam07-multipart-form-data");

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

//정적 파일들을 제공하는 폴더 지정
// app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "public")));//use는 모든 요청 방식을 다 허용, 모든요청에 해당하는 미들웨어
// app.use(express.status(path.join(__dirname, "spa")));

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


//브라우저 캐싱 금지 미들웨어 적용
app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
})

//요청 HTTP 본문에 있는 (POST 방식) 데이터를 파싱해서
//req.body 객체로 만드는 미들웨어 적용
app.use(express.urlencoded({extended:true})); //x-www-form-urlencoded: param1=value1&param2=value2 
app.use(express.json());//raw/json: {"param1":"value1", "param2":"value2"}

//"/"이렇게 요청했을때 exam01Home라는 미들웨어를 실행하겠다. 라우터도 미들웨어
app.use("/", exam01Home);
// app.use("/board", exam01Home);

// app.use("/", (req, res, next) => {
//     res.send("<html><body>Test</body></html>");
// })//미들웨어 형식

app.use("/exam02", exam02BindIfFor);
app.use("/exam03", exam03Include);
app.use("/exam04", exam04ExtendsBlock);
app.use("/exam05", exam05MiddleWare);
app.use("/exam06", exam06DataReceive);
app.use("/exam07", exam07MultipartFormData);

//기본(http://localhost:8080) 응답을 제공
// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html")
// });

//404처리 미들웨어
//위에 맞는 경로가 없을때
app.use((req, res, next) => {
    // res.status(404);
    // res.sendFile(path.join(__dirname, "views/common/error.html"));
    // res.render("common/error.html");
    const err = new Error("잘못된 요청");
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    const error = (process.env.NODE_ENV !== "production")? err:{};
    // err= (app.get("env") !== "productrion")? err:{};//req.app.get("env") == app.get("env") req 생략가능
    error.message = req.method + " " + req.url + ": " + err.message;
    error.status = err.status || 500;
    res.status(error.status);
    res.render("common/error.html", {error});

    // err = (process.env.NODE_ENV !== "production")? err:{};
    // // err= (app.get("env") !== "productrion")? err:{};//req.app.get("env") == app.get("env") req 생략가능
    // err.message = req.method + " " + req.url + ": " + err.message;
    // err.status = err.status || 500;
    // res.status(err.status);
    // res.render("common/error.html", {err});
});

//애플리케이션 실행
app.listen(app.get("port"), () => {
    console.log(`Listening to port ${app.get("port")}`);
});



