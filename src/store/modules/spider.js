import { addSpider, addSpiderStartUrls, getSpiders } from '@/api/spider'
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
    }
  },

  actions: {
    // 添加
    AddSpider({ commit }, spiderForm) {
      return spiderPromise(addSpider, spiderForm, commit, 'ADD_SPIDER_RESULT')
      // return new Promise((resolve, reject) => {
      //   addSpider(spiderForm)
      //     .then(response => {
      //       commit('ADD_SPIDER_RESULT', response)
      //       resolve(response)
      //     })
      //     .catch(error => {
      //       reject(error)
      //     })
      // })
    },

    GetSpiders({ commit }, queryString) {
      return spiderPromise(
        getSpiders,
        queryString,
        commit,
        'GET_SPIDERS_RESULT'
      )
      // return new Promise((resolve, reject) => {
      //   GetSpiders(queryString)
      //     .then(response => {
      //       commit('GET_SPIDERS_RESULT', response)
      //       resolve(response)
      //     })
      //     .catch(error => {
      //       reject(error)
      //     })
      // })
    },
    AddSpiderStartUrls({ commit }, payload) {
      return spiderPromise(
        addSpiderStartUrls,
        payload,
        commit,
        'ADD_SPIDER_STARTURLS_RESULT'
      )
      // return new Promise((resolve, reject) => {
      //   addSpiderStartUrls(payload)
      //     .then(response => {
      //       commit('ADD_SPIDER_STARTURLS_RESULT', response)
      //       resolve(response)
      //     })
      //     .catch(error => {
      //       reject(error)
      //     })
      // })
    }
  }
}

export default spider
