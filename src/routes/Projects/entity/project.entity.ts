import { User } from "src/routes/Users/entity/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("projects")
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", nullable: false })
  name: string;

  @Column({ name: "visit_date", nullable: false, type: "date" })
  visitDate: string;

  @Column({ name: "user_id", nullable: false })
  userId: number;

  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "project_start", nullable: false, type: "date" })
  dateProjectStart: string;

  @Column({ name: "project_end", nullable: false, type: "date" })
  dateProjectEnd: string;

  @Column({ name: "description", nullable: true, type: "text" })
  description: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", nullable: true })
  updatedAt: Date;
}
