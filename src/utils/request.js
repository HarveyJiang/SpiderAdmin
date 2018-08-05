import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

console.log('BASE_API', process.env.BASE_API)
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 500000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    // console.log('response data', response)
    // const res = response.data
    return response.data
    // Promise.resolve(response.data)
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     MessageBox.confirm(
    //       '你已被登出，可以取消继续留在该页面，或者重新登录',
    //       '确定登出',
    //       {
    //         confirmButtonText: '重新登录',
    //         cancelButtonText: '取消',
    //         type: 'warning'
    //       }
    //     ).then(() => {
    //       store.dispatch('FedLogOut').then(() => {
    //         location.reload() // 为了重新实例化vue-router对象 避免bug
    //       })
    //     })
    //   }
    //   return Promise.reject('error')
    // } else {
    //   return response.data
    // }
  },
  error => {
    console.log('response error:' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

// 自定义 axios post 方法
export function spiderPost(url, data) {
  console.log('spiderPost data', data)
  return service({
    url: url,
    method: 'post',
    data: data
    // mode: 'no-cors',
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   'Content-Type': 'application/json; charset=utf-8'
    // },
    // withCredentials: false,
    // credentials: 'same-origin'
    // data: JSON.stringify(data)
  })
}
// 自定义 axios get 方法
export function spiderGet(url, params) {
  console.log('spiderGet params', params)
  return service({
    url: url,
    method: 'get',
    params: params
  })
}

export function spiderDelete(url, params) {
  console.log('spiderGet params', params)
  return service({
    url: url,
    method: 'delete',
    params: params
  })
}

// 自定义 axios get 方法
export function spiderPut(url, params) {
  console.log('spiderGet params', params)
  return service({
    url: url,
    method: 'put',
    params: params
  })
}
// 封装 Dispatch
export function spiderDispatch(dispatchName, params, succeedCallback) {
  store
    .dispatch(dispatchName, params)
    .then(result => {
      succeedCallback(result)
      Message({
        message: result.message,
        type: result.messageType,
        duration: 5 * 1000
      })
    })
    .catch(e => {
      Message({
        message: 'spiderDispatch:' + e,
        type: 'error',
        duration: 5 * 1000
      })
    })
}

// 封装Promise
export function spiderPromise(callback, payload, commit, commitName) {
  return new Promise((resolve, reject) => {
    callback(payload)
      .then(response => {
        commit(commitName, response)
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}
