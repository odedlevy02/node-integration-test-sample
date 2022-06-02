import {Entity, Column, PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity({name:"worker"})
export class WorkerEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name:string
    @CreateDateColumn()
    created:Date
    @UpdateDateColumn()
    updated:Date
}