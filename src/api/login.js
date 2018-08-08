import { spiderPost, spiderGet } from './../utils/request'

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
  const a = spiderPost('/user/login', { username, password })
  console.log(a, typeof a)
  return a
}

export function getInfo(token) {
  return spiderGet('/user/info', { token })
}

export function logout() {
  return spiderPost('/user/logout')
  // return request({
  //   url: '/user/logout',
  //   method: 'post'
  // })
}
