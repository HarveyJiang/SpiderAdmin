import request from '@/utils/request'
import { get, post } from './../utils/request'

// export function login(username, password) {
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data: {
//       username,
//       password
//     }
//   })
// }

export function login(username, password) {
  const a = post('/user/login', { username, password })
  console.log(a, typeof a)
  return a
}

export function getInfo(token) {
  return get('/user/info', { token })
}

export function logout() {
  return post('/user/logout')
  // return request({
  //   url: '/user/logout',
  //   method: 'post'
  // })
}
