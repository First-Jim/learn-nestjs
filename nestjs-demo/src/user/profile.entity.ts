import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { User } from './user.entiry';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  gender: number;
  @Column()
  photo: string;
  @Column()
  address: string;
  @OneToOne(() => User)
  @JoinColumn() // 可以指定外键name JoinColumn({name: 'user_id'}) 、默认就是user表拼接id
  user: User;
}
