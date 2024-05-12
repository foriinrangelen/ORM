import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  // @PrimaryGeneratedColumn() : 기본적으로 숫자가 자동으로 증가하는 식별자(pk)를 생성
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  firstName: string;

  @Column("text")
  lastName: string;

  @Column("integer")
  age: number;
}
