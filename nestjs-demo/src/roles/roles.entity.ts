import { User } from '../user/user.entiry';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: number;
  @ManyToMany(() => User, (user) => user.roles)
  users: User;
}
