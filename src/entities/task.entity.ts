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
import { Length } from "class-validator";
import { UserEntity } from "./user.entity";

@Entity()
export class TaskEntity {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({
        nullable: false
    })
    @Length(0, 2500)
    summary!: string;

    @Column()
    performedAt!: Date;

    @OneToOne(() => UserEntity)
    @JoinColumn()
    owner!: UserEntity;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}
