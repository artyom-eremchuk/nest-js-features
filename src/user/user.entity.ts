import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsString()
  @MinLength(6)
  password: string;
}
