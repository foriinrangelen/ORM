import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
const app = express();

app.use(express.json());
app.use(morgan("dev"));

// 백엔드 실행 시 데이터 베이스 연결하기
// data-source.ts 에서 export 되어있는AppDataSource 를가져와서 initialize()로 초기화하기
AppDataSource.initialize()
  .then(() => {
    console.log("database is connected,성공");
  })
  .catch((err) => {
    console.log(err, "데이터베이스 연결 실패");
  });
app.get("/", (req, res) => {
  res.send("hello world");
});

// Express + TypeORM 활용하여 CRUD 구현해보기
// typeORM에서의 엔터티란 데이터베이스의 테이블을 클래스로 표현한 것이고
// 엔터티 클래스는 해당 데이터베이스 테이블의 구조를 정의하며, 테이블의 각 열(Column)은 클래스의 프로퍼티(Property)로 매핑된다
// 리포지토리(Repository)? - 데이터베이스와 같은 데이터 저장소와 상호작용하는 데 사용되는 디자인 패턴
// AppDataSource.getRepository() : 엔터티 개체와 함께 동작하며 CRUD 작업을 수행할 수 있게 해주는 메서드
// 1. Create- create()
app.post("/users", async (req, res) => {
  // User 엔터티를 찾아서 클라이언트에게 입력받은 req.body를 받은 데이터를 기반으로 새로운 User 엔터티 인스턴스(객체)를 생성
  const user = await AppDataSource.getRepository(User).create(req.body);
  console.log(user);
  // 생성된 User 엔터티 인스턴스 User엔터티(DB테이블)에 매핑시켜 user값 저장(Create)
  const results = await AppDataSource.getRepository(User).save(user);
  return res.send(results);
});

// 2. Read - find()
app.get("/users", async (req, res) => {
  // AppDataSource의 getRepository를 사용하여 User 엔터티에 대한 리포지토리를 가져오고,
  // find() 메서드를 통해 User 테이블에 있는 모든 데이터를 조회한다.
  const users = await AppDataSource.getRepository(User).find();
  return res.json(users);
});

// 2-1. Read One - findOneBy()
app.get("/users/:id", async (req, res) => {
  const result = await AppDataSource.getRepository(User).findOneBy({
    id: Number(req.params.id),
  });
  return res.json(result);
});

// 3. Update - merge(변경전Data, 변경할Data)
app.put("/users/:id", async (req, res) => {
  const user = await AppDataSource.getRepository(User).findOneBy({
    id: Number(req.params.id),
  });
  AppDataSource.getRepository(User).merge(user, req.body);
  let result = await AppDataSource.getRepository(User).save(user);
  return res.send(result);
});
// 4. Delete - delete()
app.delete("/users/:id", async (req, res) => {
  const result = await AppDataSource.getRepository(User).delete(
    Number(req.params.id)
  );
  res.json(result);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`servier is running on port ${PORT}`);
});
