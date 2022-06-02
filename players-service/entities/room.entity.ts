import {Entity, Column, PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity({name:"room"})
export class RoomEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    gameId:number
    @CreateDateColumn()
    created:Date
    @UpdateDateColumn()
    updated:Date
}