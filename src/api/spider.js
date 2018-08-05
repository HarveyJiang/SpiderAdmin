import { spiderPost, spiderGet } from '@/utils/request'

export function addSpider(params) {
  return spiderPost('/spider', params)
}

export function getSpiders(params) {
  return spiderGet('/spider/search', params)
}

export function addSpiderStartUrls(params) {
  return spiderPost('/spiderstarturls', params)
}
