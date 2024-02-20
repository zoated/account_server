
import userController from './controller/user'
import uploadController from './controller/upload'

const routers = [
    // 保存用户信息
    {
        path: '/save_user',
        method: 'post',
        action: userController.getUserInfo,
    },
    {
        path: '/update_user',
        method: 'put',
        action: userController.updateUserInfo,
    },
    {
        path: '/upload',
        method: 'post',
        action: uploadController.uploadAssetSource,
    },
]

export default routers
