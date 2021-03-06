import axios from 'axios'
import config from './config'
// import cookie from './cookie'
import {loading} from './ui'
import {session} from './storage'

export const xhrs = []
// axios.defaults.timeout = 8000
// axios.defaults.baseURL = config.api
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

// Ajax 通用请求参数
export const params = {
  // version: config.version,
  // mobile: '',
  // device_id: '', // 设备 ID
  // device: device.width + ':' + device.height + '|' + device.dpr, // 用户设备信息
}

// 更新通用参数
export function upParams() {
  // let mobile = cookie('mobile')
  // if (mobile && mobile !== params.mobile) {
  //   params.mobile = mobile
  // }
}

// 初始化参数
upParams()
// console.log('params:', params)

// Ajax 请求封装
export function ajax(opts) {
  upParams()
  opts.params = Object.assign({}, params, opts.params)

  return new Promise((resolve, reject) => {
    const cachekey = opts.cachekey
    const cache = cachekey ? session(cachekey) : null
    const done = (res) => {
      // 关闭接口动画
      if (!opts.noLoading) {
        loading.close()
      }

      resolve(res.data)
      opts.success && opts.success(res.data)

      // 缓存数据
      if (cachekey && res.data.Success) {
        session(cachekey, res.data)
      }
    }

    // 如果有缓存则使用缓存数据
    if (cache) {
      done({data: cache})
      return
    }

    // 调用接口动画
    if (!opts.noLoading) {
      loading.open()
    }

    const xhr = axios({
      url: opts.url,
      method: opts.method || opts.type || 'get',

      // 将被添加到 url 前面，除非 url 是绝对的
      baseURL: config.devStatus === 'dev' ? config.devApi : config.api,

      // 与请求一起发送的 URL 参数，必须是纯对象或 URLSearchParams 对象
      params: opts.params,

      // 作为请求主体发送的数据，仅适用于请求方法 PUT、POST 和 PATCH
      data: opts.data,

      // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等
      // 这里可以使用开头引入的 qs（这个模块在安装 axios 的时候就已经安装了，不需要另外安装）
      // transformRequest: [data => {
      //   return qs.stringify(data)
      // }],

      // 这里提前处理返回的数据
      // transformResponse: [data => {
      //   return data
      // }],

      // 服务器将响应的数据类型，包括：arraybuffer、blob、document、json、text、stream
      responseType: opts.responseType || opts.dataType || 'json',

      // headers: {'content-type': 'application/json'},
      headers: opts.headers || opts.header || {'content-type': 'text/plain'}, // 这里要重设，默认的有跨域问题
      // withCredentials: true, // 指示是否跨站点访问控制请求，没搞懂是作毛用的

      // 指定请求超时之前的毫秒数
      timeout: opts.timeout || 10000
    }).then(done).catch((err) => {
      // 关闭接口动画
      if (!opts.noLoading) {
        loading.close()
      }

      if (err.response) {
        // 存在请求，但是服务器的返回一个状态码，都在 2xx 之外 todo
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        // 一些错误是在设置请求时触发的
        console.log('Error', err.message)
      }
      opts.error && opts.error(err)
      console.log('网络异常: [' + err + ']')
      reject(err)
    })

    xhrs.push(xhr)
  })
}

// get 传统url请求封装
export function urlGet(url, params = {}, opts = {}) {
  opts = Object.assign(opts, {
    url,
    params,
    method: 'get'
  })

  return ajax(opts)
}

// post 传统url请求封装
export function urlPost(url, data = {}, opts = {}) {
  data = JSON.stringify(data)
  // data = new URLSearchParams(data)
  // data.append('param1', 'value1')
  opts = Object.assign(opts, {
    url,
    data,
    // headers: {'content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    // headers: {'content-type': 'multipart/form-data'},
    method: 'post'
  })

  return ajax(opts)
}

// 固定链接 请求方法不同的get
export function get(action, params = {}, opts = {}) {
  let url = config.actApi
  if (config.devStatus === 'dev') {
    url = url + '.' + action // 方便通过fiddler代理使用模拟数据
  }

  params = Object.assign({
    [config.actName]: action
  }, params)

  opts = Object.assign(opts, {
    url,
    params,
    method: 'get'
  })

  return ajax(opts)
}

// 固定链接 请求方法不同的post
export function post(action, data = {}, opts = {}) {
  let url = config.actApi
  if (config.devStatus === 'dev') {
    url = url + '.' + action // 方便通过fiddler代理使用模拟数据
  }

  data = Object.assign({
    [config.actName]: action
  }, data)

  opts = Object.assign(opts, {
    url,
    data: JSON.stringify(data),
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    method: 'post'
  })

  return ajax(opts)
}

export default {
  xhrs,
  ajax,
  urlGet,
  urlPost,
  get,
  post
}
