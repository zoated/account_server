import {Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from "typeorm"

@Entity()
export class LogInfo {
    // 自增主键
    @PrimaryColumn("int", { generated: true })
    id: number;
    // 创建时间
    @CreateDateColumn()
    created_at: string;
    // 更新时间
    @UpdateDateColumn()
    updated_at: string;
    // 删除时间
    @DeleteDateColumn()
    deleted_at: string;
    // info 信息
    @Column()
    info: string;
    // type 类型 info error warn
    @Column()
    type: string;
    // 产品名字
    @Column()
    productName: string
    // 环境
    @Column()
    env: string
}

@Entity()
export class User {
    // 自增主键
    @PrimaryColumn("int", { generated: true })
    id: number;
    @Column()
    name: string
    @Column()
    avatar: string
}