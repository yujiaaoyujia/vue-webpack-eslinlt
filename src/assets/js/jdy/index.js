import config from './config'
import { device, isWeiXin, isYzjApp, isAndroid, isIOS } from './env'
import { getParam, setParam, delParam, setObj, getRootPath } from './location'
import { setTitle } from './hack'
import cookie from './cookie'
import { pureStore, store, pureSession, session } from './storage'
import { msg, toast, loading, dialog } from './ui'
import { ajax, urlGet, urlPost, get, post, xhrs, params, upParams } from './ajax'
import * as util from './util'

// 工具函数库
export default {
  // 通用配置
  version: config.version,
  config,

  // 环境变量
  device,
  isWeiXin,
  isYzjApp,
  isAndroid,
  isIOS,

  // 通用工具
  noop: util.noop,
  util,

  // 常用工具
  getParam,
  setParam,
  delParam,
  setObj,
  getRootPath,
  setTitle,

  // 数据存储
  cookie,
  pureStore,
  store,
  pureSession,
  session,

  // UI 组件
  msg,
  toast,
  loading,
  dialog,

  // ajax
  ajax,
  urlGet,
  urlPost,
  get,
  post,
  xhrs,
  params,
  upParams

  // hack
  // setTitle
}
