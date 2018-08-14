import {
  addSpider,
  deleteSpider,
  addSpiderStartUrls,
  getSpiders,
  getSpider,
  updateSpider,
  getStartUrlsBySpiderId,
  getStartUrl,
  updateStartUrl,
  deleteStartUrl
} from '@/api/spider'
import { spiderPromise } from '@/utils/request'

const spider = {
  state: {
    addSpiderResult: {},
    addSpiderStartUrlsResult: {},
    spiders: {}
  },

  mutations: {
    ADD_SPIDER_RESULT: (state, result) => {
      state.addSpiderResult = { ...result }
    },

    ADD_SPIDER_STARTURLS_RESULT: (state, result) => {
      state.addSpiderStartUrlsResult = { ...result }
    },
    GET_SPIDERS_RESULT: (state, result) => {
      state.spiders = { ...result }
    },
    GET_SPIDER_RESULT: (state, result) => {
      state.spiders = { ...result }
    },
    DELETE_SPIDERS_RESULT: (state, result) => {
      state.spiders = { ...result }
    }
  },

  actions: {
    // 添加
    AddSpider({ commit }, spiderForm) {
      return spiderPromise(addSpider, spiderForm, commit, 'ADD_SPIDER_RESULT')
    },

    DeleteSpider({ commit }, id) {
      return spiderPromise(deleteSpider, id, commit, 'DELETE_SPIDERS_RESULT')
    },
    GetSpider({ commit }, id) {
      return spiderPromise(getSpider, id, commit, 'GET_SPIDER_RESULT')
    },
    UpdateSpider({ commit }, payload) {
      return spiderPromise(updateSpider, payload, commit, 'GET_SPIDER_RESULT')
    },
    GetSpiders({ commit }, queryString) {
      return spiderPromise(
        getSpiders,
        queryString,
        commit,
        'GET_SPIDERS_RESULT'
      )
    },
    AddSpiderStartUrls({ commit }, payload) {
      return spiderPromise(
        addSpiderStartUrls,
        payload,
        commit,
        'ADD_SPIDER_STARTURLS_RESULT'
      )
    },
    GetStartUrl({ commit }, payload) {
      return spiderPromise(
        getStartUrl,
        payload,
        commit,
        'ADD_SPIDER_STARTURLS_RESULT'
      )
    },
    UpdateStartUrl({ commit }, payload) {
      return spiderPromise(
        updateStartUrl,
        payload,
        commit,
        'ADD_SPIDER_STARTURLS_RESULT'
      )
    },
    DeleteStartUrl({ commit }, payload) {
      return spiderPromise(
        deleteStartUrl,
        payload,
        commit,
        'ADD_SPIDER_STARTURLS_RESULT'
      )
    },
    GetStartUrlsBySpiderId({ commit }, payload) {
      return spiderPromise(
        getStartUrlsBySpiderId,
        payload,
        commit,
        'ADD_SPIDER_STARTURLS_RESULT'
      )
    }
  }
}

export default spider
