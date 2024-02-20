import { User } from "../model/user";
import {getManager} from "typeorm";
import { CODE, generateDuplicateAvatar, generateDuplicateName } from "./utils";
import axios from "axios";
import { UserBody, UserReq } from "./body";

export default class UserService {
  // 设置用户信息
  getUserInfo = async (code) => {
    try {
      const postRepository = getManager().getRepository(User)
      const wxRes = await axios.get('https://api.weixin.qq.com/sns/jscode2session',{
        params: {
          appid: 'wxa48369bf6ad8b2f7',
          appSecret: '20d8073863a22a6e3e124ac7cf3e4ff5',
          js_code: code,
          grant_type: 'authorization_code', 
        }
      })
      const userInfo = postRepository.query('id', wxRes.data?.openid)
      // 查询
      if(userInfo){
        return new Promise(resole => resole({success: CODE.SUCCESS, data: userInfo, msg: '操作成功'}))
      }
      // 随机生成叠词名称
      const name = generateDuplicateName()
      const avatar = generateDuplicateAvatar()
      // 新用户信息自动注册
      const res = postRepository.create({ id: wxRes.data?.openid, name, avatar })
      await postRepository.save(res)
      return new Promise(resole => resole({success: CODE.SUCCESS, data: res, msg: '操作成功'}))
    } catch (err) {
      return { code: CODE.ERROR, msg: err.message };
    }
  }

  // 更新用户信息
  updateUserInfo = async (params: UserReq) => {
    try {
      const postRepository = getManager().getRepository(User)
      const userInfo = postRepository.query('id', params.id as any) as unknown as UserBody
      const updateUserInfo = {...userInfo, avatar: params.avatar || userInfo.avatar, name: params.name || userInfo.name}
      await postRepository.save(updateUserInfo)
      return new Promise(resole => resole({success: CODE.SUCCESS, data: updateUserInfo, msg: '操作成功'}))
    } catch (err) {
      return { code: CODE.ERROR, msg: err.message };
    }
  }

  // 获取用户历史房间信息(暂不做)
  getHistoryRoomsByUserId = async (userId: string) => {

  }

}
