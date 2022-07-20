import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Unnamed User' })
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true, default: null })
  scope: string | null;
}
