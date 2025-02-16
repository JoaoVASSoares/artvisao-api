import { Project } from "src/routes/Projects/entity/project.entity";
import { User } from "src/routes/Users/entity/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("mountings")
export class Mounting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "mounting_date", nullable: false, type: "date" })
  mountingDate: string;

  @Column({ name: "user_id", nullable: false })
  userId: number;

  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "project_id", nullable: false })
  projectId: number;

  @OneToOne(() => Project, { onDelete: "CASCADE" })
  @JoinColumn({ name: "project_id" })
  project: Project;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", nullable: true })
  updatedAt: Date;
}
