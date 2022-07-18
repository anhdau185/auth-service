import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Unnamed' })
  name: string;

  @Column({ nullable: true, default: null })
  scope: string | null;
}
