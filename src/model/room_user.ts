import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class RoomUser {
    // 自增主键
    @PrimaryColumn("int", { generated: true })
    id: number;
    @Column()
    roomId: string;
    @Column()
    userId: number;
    @CreateDateColumn()
    joinTime: number;
    @Column()
    isOwner: boolean;
    @Column({ default: 0 })
    delete: number;
}