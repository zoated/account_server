import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Score {
    // 自增主键
    @PrimaryColumn("int", { generated: true })
    id: number;
    @Column()
    score: number
    @Column()
    roomUserId: number
    @Column()
    userId: number
    @Column()
    updateTime: number
}