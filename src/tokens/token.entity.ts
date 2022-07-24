import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  token: string;

  @Column({ unique: true })
  userId: number;

  @Column({ nullable: true })
  createdAt: number | null;

  @Column({ nullable: true })
  validUntil: number | null;

  @Column({ nullable: true })
  lastUsedAt: number | null;
}
