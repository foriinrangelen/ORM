# ORM

### ORM (Object Relational Mapping) 이란?
> 객체와 관계형 데이터베이스의 데이터를 자동으로 변형 및 연결하는 작업이며 ORM을 이용한 개발은 객체와 데이터베이스의 변형에 유연하게 사용할 수있게 해준다
> MongoDB에서 mongoose(ODM)을 사용했던 것처럼 RDBMS에서는 ORM을 사용한다
객체지향 프로그래밍에서는 클래스를 사용하고, RDBMS는 Table을 사용하기 때문에 **객체모델과 관계모델이 불일치하는 문제를 ORM이 Mapping해준다**


### ORM vs Pure JavaScript ( 차이 비교해보기 )
#### ORM
```javascript
const boards= Board.find({ title: 'Hello', status: 'PUBLIC' });
```
#### Pure JavaScript
```javascript
db.query(`SELECT * FROM boards WHERE title="Hello" AND status="PUBLIC",(err, result)
=> {
    if(err) throw new Error('Error')
    boards= result.rows;
})
```
> #### ✅추상화 알아보기
> *개발에서의 추상화란 추상화를 많이하면 할수록 어떠한 복잡한 로직을 알지 못하더라도 그 로직을 간단하게 사용할 수 있게 해준다 (불필요한 정보는 숨기고 중요한 정보만을 표현해서 프로그램을 간단하게 해준다)
> **예시로 커피머신을 이용할 줄 안다면, 커피머신이 어떻게 동작하는지 몰라도 커피를 마실 수 있는것과 같은 원리***
### Node에서의 추상화 단계 ( 저수준, 중수준, 고수준 )
#### 1. 저수준: 데이터베이스 드라이버 이용, SQL문자열 작성하여 DB에전달, 응답받는 방식 (mysql, pg, sqlite3 etc..)
<div><img src="https://github.com/foriinrangelen/ORM/assets/123726292/eff58106-6640-4f4d-b720-b104b53857b5" alt="image" style="width: 500px; height: 400px;"></div>

#### 2. 중수준: 쿼리빌더 이용, DB driver+ ORM 사용의 중간수준의 추상화 (Knex와 함께 사용하려는 특정라이브러리 설치)
<div><img src="https://github.com/foriinrangelen/ORM/assets/123726292/0aeedfb6-9333-4172-9ccc-d53a9ded9ab6" alt="image" style="width: 800px; height: 400px;"></div>

#### 3. ✅고수준: ORM, ORM으로 작업시 일반적으로 더많은 설정 사전에수행, DB data를 애플리케이션의 객체(클래스 인스턴스)에 매핑
**Prisma, sequelize, TypeORM** etc..
#### ORM의 단점
1. SQL을 사용하는게 아닌 ORM자체를 사용하므로 각각의 ORM을 배우는 비용소모가 크다
2. ORM을 이용해서 복잡한 호출을하면 성능이 좋지 않을 수 있다 (DB driver = query builder > orm)
#### ORM의 장점
1. 하나의 소스코드로 여러 데이터베이스로 쉽게 교체가 가능하다 (orm 내부적으로 분기처리)
2. 중복코드를 방지
3. SQL injection공격의 취약점에 대한보호
4. 모델 유효성 검사 지원
5. TypeScript 지원

### TypeORM 알아보기
TypeORM은 node.js에서 실행되고 TypeScript로 작성된 객체 관계형 mapper 라이브러리
#### TypeORM 특징
1. 모델기반으로 데이터베이스 테이블 체계를 자동으로 생성
2. 데이터베이스의 개체를 쉽게 CRUD 가능
3. 테이블간의 매핑(일대일, 일대다 및 다대다)를 만듦
4. 간단한 CLI 명령을 제공
#### TypeORM 사용해보기
1. 프로젝트 폴더 생성
2. **`npm init`**
3. **`npx tsc --init`**
4. **`npm install morgan nodemon express`**
5. **`npm install typescript tsx @types/node @types/express @types/morgan --save-dev`**
(ts-node는 node가 LTS 20번대로 올라오면서 정상작동하지않음, tsx로 변경)

#### morgan
nodeJS에서 사용되는 로그 관리를 위한 미들웨어
#### types/express @types/node
Express 및 NodeJS에 대한 Type정의에 도움

### express 앱에 typeorm을 이용한 데이터베이스 연결하기
1. **`npm i pg typeorm reflect-metadata --save`**
2. **`npx typeorm init`**
#### pg
PostgreSQL 데이터베이스와 인터페이스하기 위한 NodeJS모듈 모음(DB드라이버)
#### typeorm
TypeScript 및 JacaScript와 함께 사용할 수 있는 NodeJS에서 실행되는 ORM
#### reflect-metadata
데코레이터를 사용하기 위해서 필요한 모듈
#### npx typeorm init
TypeORM을 사용하기위한 파일들 생성 (data-source.ts, entity, migration etc..)

<div>
    <img src="https://github.com/foriinrangelen/ORM/assets/123726292/a6e31eb9-b670-4204-a876-9268a561d6bd" alt="image" style="width: 500px; height: 400px;">
    <img src="https://github.com/foriinrangelen/ORM/assets/123726292/9963e450-976e-4e27-b386-4776f7f205f9" alt="image" style="width: 500px; height: 250px;">
</div>

### package.json
```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "tsx src/index.ts",
    "dev": "nodemon --exec tsx src/index.ts"
  },
```

<div>
    <img src="https://github.com/foriinrangelen/ORM/assets/123726292/300bed04-ea9e-4e7c-b98a-da738122b5e6" alt="image" style="width: 90%; height: 700px;">
</div>
<div>
    <img src="https://github.com/foriinrangelen/ORM/assets/123726292/b8252e32-cdf0-401a-9727-d692d2ac8b7b" alt="image" style="width: 90%; height: 700px;">
</div>

### 윈도우에서 Docker 설치하기 / Docker 이용해서 Postgres 설치&실행하기
1. **`https://www.docker.com/`** > **get started**
2. src 폴더 내에 **`docker-compose.yml`** 파일 생성
3. **`docker-compose.yml`** 파일작성
#### docker-compose.yml
```yml
version: "3"
services:
  db:
    image: postgres:latest
    container_name: postgres_typeorm_container
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: "postgres"
      POSTGRES_PASSWORD: "password"
    volumes:
      - ./data:/var/lib/postgresql/data

```
4. docker 실행 후 **`docker-compose.yml`** 파일이있는 디렉토리로 이동 후 명령어 **`docker-compose up`** 실행
5. docker container 에서 설정해준 username과 password를 `data-source.ts`에서 설정 후 서버실행
Q. "emitDecoratorMetadata": true,"experimentalDecorators": true, 최상단 import "reflect-metadata"; 확인, 왜 user.ts에서 @Column("text") 을 해주지않으면 에러가 나는가?
