import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    OneToOne
} from "typeorm";
import { User } from "./User";

@Entity()
export class Task {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({
        nullable: false
    })
    summary!: string;

    @Column()
    performedAt!: Date;

    @OneToOne(() => User)
    @JoinColumn()
    owner!: User;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}
