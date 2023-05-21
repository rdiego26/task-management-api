import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

import { IsEmail } from "class-validator";

export enum Role {
  MANAGER = "manager",
  TECHNICIAN = "technician"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({
        nullable: false
    })
    name!: string;

    @Column({
        nullable: false,
        unique: true
    })
    @IsEmail()
    email!: string;

    @Column({
        nullable: false,
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
