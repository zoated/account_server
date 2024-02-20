import {getManager} from "typeorm";
import { CODE } from "./utils";
import { ScoreReq } from "./body";
import { Score } from "../model/score";

export default class ScoreService {
  // 更新房间分数
  updateRoomScore = async (params: ScoreReq) => {
    try {
      const postRepository = getManager().getRepository(Score)
      const userScore = await postRepository
      .createQueryBuilder("score")
      .where("score.roomUserId = :id", { id: params.id })
      .andWhere("score.userId = :userId", { userId: params.userId })
      .getOne();
      const updateScore = {...userScore, score: params.score}
      await postRepository.save(updateScore)
      return new Promise(resole => resole({success: CODE.SUCCESS, data: updateScore, msg: '操作成功'}))
    } catch (err) {
      return { code: CODE.ERROR, msg: err.message };
    }
  }
}