import {Entity, Column, PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity({name:"game"})
export class GameEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name:string
    @CreateDateColumn()
    created:Date
    @UpdateDateColumn()
    updated:Date
}