import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Room {
    // 自增主键
    @PrimaryColumn("int", { generated: true })
    id: string;
    @Column()
    roomName: string
    @CreateDateColumn()
    createdTime: number
}