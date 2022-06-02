import {Entity, Column, PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity({name:"player"})
export class PlayerEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name:string
    @Column()
    gameId:number
    @Column({nullable:true})
    roomId:number
    @CreateDateColumn()
    created:Date
    @UpdateDateColumn()
    updated:Date
}