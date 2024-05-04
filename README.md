# ORM
### ORM (Object Relational Mapping) 이란?
> 객체와 관계형 데이터베이스의 데이터를 자동으로 변형 및 연결하는 작업이며 ORM을 이용한 개발은 객체와 데이터베이스의 변형에 유연하게 사용할 수있게 해준다
> MongoDB에서 mongoose(ODM)을 사용했던 것처럼 RDBMS에서는 ORM을 사용한다
객체지향 프로그래밍에서는 클래스를 사용하고, RDBMS는 Table을 사용하기 때문에 **객체모델과 관계모델이 불일치하는 문제를 ORM이 Mapping해준다**
<div><img src="https://github.com/foriinrangelen/ORM/assets/123726292/234bf0b3-e29a-4855-ba5f-bee0336db5e3" alt="image" style="width: 300px; height: 300px;"></div>

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
> #### 추상화 알아보기
> *개발에서의 추상화란 추상화를 많이하면 할수록 어떠한 복잡한 로직을 알지 못하더라도 그 로직을 간단하게 사용할 수 있게 해준다 (불필요한 정보는 숨기고 중요한 정보만을 표현해서 프로그램을 간단하게 해준다)
> **예시로 커피머신을 이용할 줄 안다면, 커피머신이 어떻게 동작하는지 몰라도 커피를 마실 수 있는것과 같은 원리***
### Node에서의 추상화 단계
크게 저수준, 중수준, 고수준 으로 나뉘며
1. 저수준: 데이터베이스 드라이버
