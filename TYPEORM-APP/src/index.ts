import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("hello world");
});

// 백엔드 실행 시 데이터 베이스 연결하기
// data-source.ts 에서 export 되어있는AppDataSource 를가져와서 initialize()로 초기화하기
AppDataSource.initialize()
  .then(() => {
    console.log("database is connected,성공");
  })
  .catch((err) => {
    console.log(err, "데이터베이스 연결 실패");
  });

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`servier is running on port ${PORT}`);
});
