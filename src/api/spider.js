import { spiderPost, spiderGet, spiderDelete, spiderPut } from '@/utils/request'

export function addSpider(params) {
  return spiderPost('/spider', params)
}

export function getSpider(params) {
  // return spiderGet('/spider/' + params.id)
  return spiderGet(`/spider/${params.id}`)
}

export function updateSpider(params) {
  return spiderPut('/spider', params)
}

export function deleteSpider(params) {
  // return spiderDelete('/spider/' + params.id)
  return spiderDelete(`/spider/${params.id}`)
}

export function getSpiders(params) {
  return spiderGet('/spider/search', params)
}

export function addSpiderStartUrls(params) {
  return spiderPost('/spider_starturl', params)
}

export function getStartUrl(params) {
  return spiderGet(`/spider_starturl/${params.id}`)
}

export function updateStartUrl(params) {
  return spiderPut('/spider_starturl', params)
}
export function deleteStartUrl(params) {
  return spiderDelete(`/spider_starturl/${params.id}`)
}

export function getStartUrlsBySpiderId(params) {
  const spiderId = params.spiderId
  return spiderGet(`/spider_starturl/spider/${spiderId}/starturls`, params)
}
