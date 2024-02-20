export interface UserBody {
    avatar: string
    name: string
}

export interface UserReq extends Partial<UserBody> {
    id: string
}

export interface RoomReq {
    userId: number
    roomName: string
}

export interface RoomUserReq {
    userId: number
    roomId: string
    id?: string
}

export interface ScoreReq {
    id: string
    userId: number
    score: number
}