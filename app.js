//모듈 가져오기 
const express = require("express");
const path = require("path");
const nunjucks =  require("nunjucks");
const dotenv = require("dotenv");

//라우터 가져오기
const exam01Home = require("./routes/exam01-home");
const exam02BindIfFor = require("./routes/exam02-bind-if-for"); 
const exam03Include = require("./routes/exam03-include");
const exam04ExtendsBlock = require("./routes/exam04-extend-block");

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
app.use(express.static(path.join(__dirname, "public")));

app.use("/", exam01Home);
// app.use("/board", exam01Home);
app.use("/exam02", exam02BindIfFor);
app.use("/exam03", exam03Include);
app.use("/exam04", exam04ExtendsBlock);

//기본(http://localhost:8080) 응답을 제공
// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html")
// });


//애플리케이션 실행
app.listen(app.get("port"), () => {
    console.log(`Listening to port ${app.get("port")}`);
});