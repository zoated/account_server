import {getManager} from "typeorm";
import { CODE, generateRoomNumber } from "./utils";
import { Room } from "../model/room";
import { RoomUser } from "../model/room_user";
import { RoomReq, RoomUserReq } from "./body";
import { User } from "../model/user";
import { Score } from "../model/score";

export default class RoomService {
  // 创建房间
  createRoom = async (params: RoomReq) => {
    try {
      if(!params.roomName){
        throw new Error('房间名称不能为空')
      }
      const roomRepository = getManager().getRepository(Room)
      const roomUserRepository = getManager().getRepository(RoomUser)
      const roomId = generateRoomNumber()
      const roomRes = await roomRepository.create({ id: roomId, roomName: params.roomName, createdTime: new Date().getTime() })
      const roomUserRes = await roomUserRepository.create({ roomId: roomId, userId: params.userId, isOwner: true, joinTime: new Date().getTime() })
      await roomRepository.save(roomRes)
      await roomUserRepository.save(roomUserRes)
      return new Promise(resole => resole({success: CODE.SUCCESS, data: null, msg: '操作成功'}))
    } catch (err) {
      return { code: CODE.ERROR, msg: err.message };
    }
  }

  // 加入房间
  joinRom = async (params: RoomUserReq) => {
    try {
      const roomUserRepository = getManager().getRepository(RoomUser)
      const userRepository = getManager().getRepository(User)
      const res = await roomUserRepository.create({ roomId: params.roomId, userId: params.userId, isOwner: false, joinTime: new Date().getTime() })
      const userInfo = await userRepository.query('id', params.userId as any)
      return new Promise(resole => resole({success: CODE.SUCCESS, data: {...res, ...userInfo}, msg: '操作成功'}))
    } catch (err) {
      return { code: CODE.ERROR, msg: err.message };
    }
  }

  // 离开房间
  leaveRoom = async (params: RoomUserReq) => {
    try {
      const roomUserRepository = getManager().getRepository(RoomUser)
      const res = await roomUserRepository.createQueryBuilder('roomUser')
      .where("score.roomUserId = :id", { id: params.id })
      .andWhere("score.userId = :userId", { userId: params.userId })
      .getOne()
      roomUserRepository.save({...res, delete: 1})
      return new Promise(resole => resole({success: CODE.SUCCESS, data: null, msg: '操作成功'}))
    } catch (err) {
      return { code: CODE.ERROR, msg: err.message };
    }
  }

  // 获取房间信息
  getRoomInfo = async (roomId: string) => {
    try {
      const roomUserRepository = getManager().getRepository(RoomUser)
      const userRepository = getManager().getRepository(User)
      const roomRepository = getManager().getRepository(Room)
      const scoreRepository = getManager().getRepository(Score)

      const roomInfo = await roomRepository.query('id', roomId as any)
      const roomUserIds = await roomUserRepository.createQueryBuilder("roomUser").select("roomUser.userId").where("roomUser.roomId = :roomId", { roomId }).getMany();

      const users = await userRepository.createQueryBuilder("user")
      .whereInIds(roomUserIds.map(roomUser => roomUser.userId))
      .getMany();

      // 查询每个用户的分数
      const scores = await scoreRepository.createQueryBuilder("score")
      .whereInIds(roomUserIds.map(roomUser => roomUser.id))
      .getMany();

      // 将用户信息与分数和房间关联起来
       const res = {
          roomId: roomInfo.id,
          roomName: roomInfo.roomName,
          users: users.map(user => {
            const score = scores.find(score => score.userId === user.id);
            const roomUser = roomUserIds.find(score => score.userId === user.id);
            return {
              ...user,
              score: score.score || 0,
              joinTime: roomUser.joinTime,
              isOwner: roomUser.isOwner,
            }
        })
      };
      return new Promise(resole => resole({success: CODE.SUCCESS, data: res, msg: '操作成功'}))
    } catch (err) {
      return { code: CODE.ERROR, msg: err.message };
    }
  }
}