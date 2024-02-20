import UserService from '../service/user'

class UserController {
  private service: UserService = new UserService()
  // 创建/获取用户信息
  getUserInfo = async ctx => {
    if(!ctx.request.body?.code){
      return ctx.reject('小程序登陆凭证 code为空');
    }
    // 校验参数ctx层
    ctx.body = await this.service.getUserInfo(ctx.request.body)
  }
  // 更新用户信息
  updateUserInfo = async ctx => {
    // 校验参数ctx层
    ctx.body = await this.service.updateUserInfo(ctx.request.body)
  }
}

export default new UserController()
