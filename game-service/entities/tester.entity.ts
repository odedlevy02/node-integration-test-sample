import {Entity, Column, PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity({name:"tester"})
export class TesterEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name:string
    @CreateDateColumn()
    created:Date
    @UpdateDateColumn()
    updated:Date
}