import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

export enum Role {
  MANAGER = "manager",
  TECHNICIAN = "technician"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.TECHNICIAN
    })
    role!: Role;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
