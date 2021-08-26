import { UserLogin } from './scumall.ratel'

export function AccountLogin (data) {
  return new Promise((resolve) => {
    UserLogin({ userName: data.username, password: data.password }).then(res => {
      if (res.status === 0) {
        resolve({
          code: 0,
          msg: '登录成功',
          data: {
            username: data.username,
            password: data.password,
            uuid: res.data,
            name: data.username,
            token: res.data
          }
        })
      } else {
        resolve({
          code: 404,
          msg: '网络异常',
          data: {}
        })
      }
    }).catch(() => {
      resolve({
        code: 401,
        msg: '用户名或密码错误',
        data: {}
      })
    })
  })
}
