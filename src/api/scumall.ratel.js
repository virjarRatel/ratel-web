import request from '@/plugin/axios'

export function UserAdd (data) {
  let form = new FormData()
  form.append('userName', data.userName)
  form.append('password', data.password)
  return request({
    url: `/ratel/user/add`,
    method: 'post',
    data: form,
    config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  })
}

export function UserLogin (data) {
  let form = new FormData()
  form.append('userName', data.userName)
  form.append('password', data.password)
  return request({
    url: `/ratel/user/login`,
    method: 'post',
    data: form,
    config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  })
}

export function UploadApk (data, config) {
  let form = new FormData()
  form.append('rawTargetApk', data.raw)
  form.append('crackApk', data.crack)
  form.append('userId', data.userId)
  return request({
    url: `/ratel/mergeApk/uploadTask`,
    method: 'post',
    data: form,
    ...config
  })
}

export function TaskList (data) {
  let url = `/ratel/task/list?userId=${data.userId}&page=${data.page || 0}&size=${data.size || 20}`
  if (data.status) {
    url += `&status=${data.status}`
  }
  return request({
    url,
    method: 'get'
  })
}
