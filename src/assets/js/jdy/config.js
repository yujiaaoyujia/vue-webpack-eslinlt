import { getRootPath } from './location'

export default {
  devStatus: 'dev', // 'release',
  devApi: '//' + location.host + getRootPath('/kdmobile'),
  api: '//' + location.host + getRootPath('/kdmobile'),
  actApi: 'SalMobile.action',
  actName: 'Action',
  version: '1.0.2',
  storageGUID: 'SALEMOBILE',
}
